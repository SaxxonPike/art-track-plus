import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function MenuMoreIcon() {
    return (
        <FontAwesomeIcon className={"text-muted"} icon={faArrowRight}/>
    );
}