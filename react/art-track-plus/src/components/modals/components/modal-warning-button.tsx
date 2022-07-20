import {Button} from "react-bootstrap";
import React from "react";

export default function ModalWarningButton(props) {
    return (
        <Button type={"button"} variant={"warning"} {...props}/>
    );
}