import {AppContext} from "./app-context";
import Toast from "./models/toast";
import Modal from "./models/modal";
import Artist from "./models/artist";
import FindResult from "./models/find-result";
import * as fuzzysort from "fuzzysort";

export class AppActions {
    private context: AppContext;

    constructor(context: AppContext) {
        this.context = context;
    }

    getToasts() {
        return this.context.state.toasts;
    }

    openToast(toast: Toast) {
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

    closeToast(toastId: number) {
        this.context.setState({
            toasts: this.context.state.toasts
                .filter(toast => toast.id != toastId)
        });
    }

    getModals() {
        return this.context.state.modals;
    }

    openModal(modal: Modal) {
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
    }

    closeModal(modalId: number) {
        this.context.setState({
            modals: this.context.state.modals
                .filter(modal => modal.id != modalId)
        });
    }

    find(query: string) {
        const results: FindResult[] = [];

        if (!query) {
            return results;
        }

        function transformFuzzySort(output, type, link) {
            return output
                .flatMap(matches => matches
                    .map(match => (<FindResult>{
                        name: matches.obj.name,
                        type: type,
                        matchedOn: match.target,
                        link: link,
                        score: match.score
                    })));
        }

        const artistResults = transformFuzzySort(fuzzysort
            .go(query, this.context.state.artists, {
                keys: ["name", "badgeNumber", "tableNumber"]
            }), "artist", "#");

        // Sort by score, descending.
        return [...artistResults]
            .sort((a, b) => b.score - a.score);
    }

    getArtist(id: number): Artist {
        const artists = this.context.state.artists
            .filter(artist => artist.id === id);
        return artists.length < 1 ? null : {...artists[0]};
    }

    setArtist(artist: Artist): Artist {
        if (!artist.id) {
            return;
        }

        const otherArtists = this.context.state.artists
            .filter(a => a.id !== artist.id);
        otherArtists.push(artist);
    }
}