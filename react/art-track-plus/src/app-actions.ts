import {AppContext} from "./app-context";
import Toast from "./models/toast";
import Modal from "./models/modal";
import Artist from "./models/artist";
import FindResult from "./models/find-result";
import * as fuzzysort from "fuzzysort";
import {generatePath} from "react-router-dom";
import paths from "./paths";
import AppRecord from "./features/databases/app-record";

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
        console.log("refreshing");

        const data = await this.context.dataSource.refresh();
        this.context.setState({
            artists: data.artists
        });
        return data;
    }

    // Get all artists.
    getArtists(): Artist[] {
        return [...this.context.state.artists];
    }

    // Get a specific artist by ID.
    getArtist(id: number): Artist {
        console.log("get artist", id);
        const allArtists = this.context.state.artists;
        const artists = allArtists
            .filter(artist => artist.id === id);
        return artists.length < 1 ? null : {...artists[0]};
    }

    // Update artist information.
    async updateArtist(artist: Artist) {
        const {id} = artist;

        if (!id) {
            return;
        }

        const {...record} = artist;

        const db = await this.context.dataSource
            .save({artists: [record]});

        const result = {...db.artists[0]};

        console.log("Updated artist", result);

        const otherArtists = this.context.state.artists
            .filter(record => record.id !== id);

        this.context.setState({artists: [...otherArtists, result]});

        return <Artist>result;
    }

    // Create a new artist.
    async createArtist(artist: Artist) {
        const {id, ...record} = artist;

        if (id) {
            return;
        }

        const db = await this.context.dataSource
            .save({artists: [record]});

        const result = {...db.artists[0]};

        console.log("New artist", result);

        const otherArtists = this.context.state.artists;

        this.context.setState({artists: [...otherArtists, result]});

        return <Artist>result;
    }

    // Delete an artist.
    async deleteArtist(id: number) {
        if (!id) {
            return;
        }

        const db = await this.context.dataSource
            .save({artists: [{id: id, deleted: true}]});

        const result = {...db.artists[0]};

        console.log("Delete artist", result);

        const otherArtists = this.context.state.artists
            .filter(record => record.id !== id);

        this.context.setState({artists: [...otherArtists]});

        return <Artist>result;
    }
}