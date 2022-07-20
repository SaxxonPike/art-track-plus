import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ScreenIcon() {
    return (
        <FontAwesomeIcon icon={faDesktop}/>
    );
}

export default memo(ScreenIcon);