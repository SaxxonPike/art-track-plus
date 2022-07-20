import {Button} from "react-bootstrap";
import React from "react";

// Button for a modal that appears as a plain link.
export default function ModalLabelButton(props) {
    return (
        <Button type={"button"} variant={"link"} {...props}/>
    );
}