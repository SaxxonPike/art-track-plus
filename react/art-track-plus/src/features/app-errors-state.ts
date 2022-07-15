import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import AppError from '../models/app-error';

interface AppErrorsState {
    errors: AppError[],
    enabled: boolean,
    id: number
}

const initialState: AppErrorsState = {
    errors: [],
    enabled: true,
    id: 1
}

export const appErrorsState = createSlice({
    name: 'app-errors',
    initialState: initialState,
    reducers: {
        dismissError: (state, action: PayloadAction<Number>) => {
            if (!action.payload) {
                return;
            }

            state.errors = state.errors.filter(e => e.id !== action.payload);
            return state;
        },
        dismissAllErrors: (state) => {
            state.errors = [];
            return state;
        },
        disableErrors: (state) => {
            state.enabled = false;
            return state;
        },
        enableErrors: (state) => {
            state.enabled = true;
            return state;
        },
        raiseError: (state, action: PayloadAction<string>) => {
            const id = state.id++;
            const item: AppError = {
                message: action.payload,
                id: id
            };
            state.errors.push(item);
        }
    },
})

export const {dismissError, dismissAllErrors, disableErrors, enableErrors, raiseError} = appErrorsState.actions

export default appErrorsState.reducer
