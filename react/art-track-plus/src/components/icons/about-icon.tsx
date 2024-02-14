import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function AboutIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faQuestionCircle}/>
    );
}

export default memo(AboutIcon);