import {Button} from "react-bootstrap";
import React from "react";

export default function ModalDangerButton(props) {
    return (
        <Button type={"button"} variant={"danger"} {...props}/>
    );
}