import {Button} from "react-bootstrap";
import React from "react";

export default function ModalPrimaryButton(props) {
    return (
        <Button type={"button"} variant={"primary"} {...props}/>
    );
}