import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGears} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SettingsIcon() {
    return (
        <FontAwesomeIcon icon={faGears}/>
    );
}

export default memo(SettingsIcon);