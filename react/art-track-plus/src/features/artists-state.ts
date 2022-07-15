import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Artist from "../models/artist";
import {raiseError} from "./app-errors-state";

interface ArtistRepository {
    artists: Artist[]
}

const initialState: ArtistRepository = {
    artists: []
}

export const artistsState = createSlice({
    name: 'artists-state',
    initialState: initialState,
    reducers: {
        add: (state, action: PayloadAction<Artist>) => {
            const artist = new Artist(action.payload);
            if (!artist) {
                raiseError("Payload missing");
                return state;
            }

            if (artist.id) {
                raiseError("Artist ID cannot be preset during add");
                return state;
            }

            const errors = artist.checkForErrors();
            if (errors) {
                errors.forEach(error => raiseError(error));
                return state;
            }

            // DB implementation specific

            artist.id = state.artists.length > 0 ?
                Math.max(...state.artists.map(a => a.id)) + 1 : 1;
            state.artists.push(artist);
        },
        update: (state) => {

        },
        remove: (state) => {

        }
    },
})

export const {add, update, remove} = artistsState.actions

export default artistsState.reducer
