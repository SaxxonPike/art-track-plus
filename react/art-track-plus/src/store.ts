import {configureStore} from "@reduxjs/toolkit";
import appErrorsState from "./features/app-errors-state";

export const store = configureStore({
    reducer: {
        appErrors: appErrorsState
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
