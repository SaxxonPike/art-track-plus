import {ToastProps} from "react-bootstrap";

export default interface Toast {
    id?: number
    props?: ToastProps
    header?: React.ReactNode
    body?: React.ReactNode
    variant?: string
}