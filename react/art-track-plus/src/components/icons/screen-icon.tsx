import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ScreenIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faDesktop}/>
    );
}

export default memo(ScreenIcon);