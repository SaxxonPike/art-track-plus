import {Button} from "react-bootstrap";
import React from "react";

export default function ModalSecondaryButton(props) {
    return (
        <Button type={"button"} variant={"secondary"} {...props}/>
    );
}