import {ModalProps} from "react-bootstrap";

export default interface Modal {
    id?: number
    props?: ModalProps
    header?: React.ReactNode | null
    body?: React.ReactNode | null
    footer?: React.ReactNode | null
}

