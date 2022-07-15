import * as appErrorsState from "./app-errors-state";
import {useAppDispatch} from "../hooks";

const dispatch = useAppDispatch;

export const appErrorsActions = {
    dismissError: (id: number) => dispatch()(appErrorsState.dismissError(id)),
    dismissAllErrors: () => dispatch()(appErrorsState.dismissAllErrors()),
    enableErrors: () => dispatch()(appErrorsState.enableErrors()),
    disableErrors: () => dispatch()(appErrorsState.disableErrors()),
    raiseError: (message: string) => dispatch()(appErrorsState.raiseError(message))
};