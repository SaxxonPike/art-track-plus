import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGears} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SettingsIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faGears}/>
    );
}

export default memo(SettingsIcon);