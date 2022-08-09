import {AppContext} from "./app-context";
import Toast from "./models/toast";
import Modal from "./models/modal";
import Artist from "./models/artist";
import FindResult from "./models/find-result";
import * as fuzzysort from "fuzzysort";
import {generatePath} from "react-router-dom";
import paths from "./paths";
import AppRecord from "./features/databases/app-record";
import ArtistTools from "./features/tools/artist-tools";
import names from "./names";
import LotteryTools from "./features/tools/lottery-tools";

export class AppActions {
    private context: AppContext;

    constructor(context: AppContext) {
        this.context = context;
    }

    // Retrieve currently open toasts.
    getToasts() {
        return this.context.state.toasts;
    }

    // Open a toast and return its ID.
    async openToast(toast: Toast) {
        const state = this.context.state;
        const id = state.toastId;
        const toasts = [...state.toasts];

        toasts.push({
            ...toast,
            id: id
        });

        this.context.setState({
            toastId: id + 1,
            toasts: toasts
        });

        return id;
    }

    // Close a toast by its ID.
    async closeToast(toastId: number) {
        this.context.setState({
            toasts: this.context.state.toasts
                .filter(toast => toast.id != toastId)
        });
    }

    // Retrieve all currently open modals.
    getModals() {
        return this.context.state.modals;
    }

    // Open a new modal and return its ID.
    async openModal(modal: Modal) {
        const state = this.context.state;
        const id = state.modalId;
        const modals = [...state.modals];

        modals.push({
            id: id,
            ...modal
        })

        this.context.setState({
            modalId: id + 1,
            modals: modals
        });

        return id;
    }

    // Close a modal by its ID.
    async closeModal(modalId: number) {
        this.context.setState({
            modals: this.context.state.modals
                .filter(modal => modal.id != modalId)
        });
    }

    // Do a "universal" search.
    find(query: string) {
        const results: FindResult[] = [];

        if (!query) {
            return results;
        }

        function transformFuzzySort(output: Fuzzysort.KeysResults<AppRecord>, type: string, link: (item) => string): FindResult[] {
            return output
                .flatMap(matches => matches
                    .filter(match => !!match)
                    .map(match => (<FindResult>{
                        name: matches?.obj?.name,
                        type: type,
                        matchedOn: match?.target,
                        link: link(matches?.obj),
                        score: match?.score
                    })));
        }

        const artistResults = transformFuzzySort(fuzzysort
            .go(query, this.context.state.artists, {
                keys: ["name", "badgeNumber", "tableNumber"]
            }), "artist", a => generatePath(paths.editArtist, {artistId: a.id}));

        // Sort by score, descending.
        return [...artistResults]
            .sort((a, b) => b.score - a.score);
    }

    // Reload all data.
    async refresh() {
        try {
            const data = await this.context.dataSource.refresh();
            this.context.setState({
                artists: data.artists
            });
            return data;
        } catch (e) {
            await this.openToast({
                header: "Failed to refresh database",
                body: e
            });
            throw e;
        }
    }

    // Get all artists.
    getArtists(): Artist[] {
        return [...this.context.state.artists];
    }

    // Get a specific artist by ID.
    getArtist(id: number): Artist {
        try {
            const allArtists = this.context.state.artists;
            const artists = allArtists
                .filter(artist => artist.id === id);
            return artists.length < 1 ? null : {...artists[0]};
        } catch (e) {
            this.openToast({
                header: "Failed to fetch " + names.vendor + " " + id,
                body: e
            });
            throw e;
        }
    }

    async updateAllArtists(fields: Artist) {
        const {...artist} = fields;
        delete artist.id;

        try {
            return await this.context.dataSource
                .updateMany({
                    artists: [artist]
                });
        } catch (e) {
            await this.openToast({
                header: "Failed to update " + names.vendors,
                body: e
            });
            throw e;
        }
    }

    // Update artist information.
    async updateArtist(artist: Artist) {
        const {id, ...rest} = artist;

        if (!id) {
            return;
        }

        try {
            const existing = this.getArtist(id);
            const {...record} = {...existing, ...rest};

            const db = await this.context.dataSource
                .save({artists: [record]});

            const result = {...db.artists[0]};

            console.log("Updated artist", result);

            const otherArtists = this.context.state.artists
                .filter(record => record.id !== id);

            this.context.setState({artists: [...otherArtists, result]});

            return <Artist>result;
        } catch (e) {
            await this.openToast({
                header: "Failed to update " + names.vendor + " " + id,
                body: e
            });
            throw e;
        }
    }

    // Create a new artist.
    async createArtist(artist: Artist) {
        const {id, ...record} = artist;

        if (id) {
            return;
        }

        try {
            const db = await this.context.dataSource
                .save({artists: [record]});

            const result = {...db.artists[0]};

            console.log("New artist", result);

            const otherArtists = this.context.state.artists;

            this.context.setState({artists: [...otherArtists, result]});

            return <Artist>result;
        } catch (e) {
            await this.openToast({
                header: "Failed to create " + names.vendor,
                body: e
            });
            throw e;
        }
    }

    // Delete an artist.
    async deleteArtist(id: number) {
        if (!id) {
            return;
        }

        try {
            const db = await this.context.dataSource
                .save({artists: [{id: id, deleted: true}]});

            const result = {...db.artists[0]};

            console.log("Delete artist", result);

            const otherArtists = this.context.state.artists
                .filter(record => record.id !== id);

            this.context.setState({artists: [...otherArtists]});

            return <Artist>result;
        } catch (e) {
            await this.openToast({
                header: "Failed to delete " + names.vendor + " " + id,
                body: e
            });
            throw e;
        }
    }

    // Get the next standby order.
    getNextStandby() {
        const orders = this.context.state.artists
            .filter(a => !!a.standbyOrder)
            .map(a => a.standbyOrder);

        if (orders.length < 1) {
            return 1;
        }

        return Math.max(...orders) + 1;
    }

    // Get the next lottery order.
    getNextLottery() {
        const orders = this.context.state.artists
            .filter(a => !!a.lotteryOrder)
            .map(a => a.lotteryOrder);

        if (orders.length < 1) {
            return 1;
        }

        return Math.max(...orders) + 1;
    }

    // Set an artist to the end of the standby list.
    async standbyArtist(artistId: number) {
        const artist = this.getArtist(artistId);
        if (!artist) {
            return;
        }

        return this.updateArtist({
            id: artistId,
            tableNumber: null,
            lotteryOrder: null,
            standbyOrder: this.getNextStandby(),
            standbyDays: ArtistTools.addToday(artist.standbyDays)
        });
    }

    // Sign out an artist and set whether they will be considered for the next lottery.
    async signOutArtist(artistId: number, nextDayLotto: boolean) {
        return this.updateArtist({
            id: artistId,
            tableNumber: null,
            standbyOrder: null,
            lotteryOrder: null,
            lotteryEligible: nextDayLotto
        });
    }

    // Sign in an artist with specified table number.
    async signInArtist(artistId: number, tableNumber: string) {
        return this.updateArtist({
            id: artistId,
            tableNumber: tableNumber,
            standbyOrder: null,
            lotteryOrder: null,
            seatedLast: new Date().toISOString()
        });
    }

    // Run the lottery.
    async runLottery(seats: number, day: string) {
        return LotteryTools.runLottery(this.context.state.artists, seats, day);
    }
}