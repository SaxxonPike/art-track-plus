import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlask} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ExperimentalIcon(props) {
    return (
        <FontAwesomeIcon{...props} icon={faFlask}/>
    );
}

export default memo(ExperimentalIcon);