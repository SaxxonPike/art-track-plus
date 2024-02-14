import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHammer} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ActionIcon(props) {
    return (
        <FontAwesomeIcon{...props}  icon={faHammer}/>
    );
}

export default memo(ActionIcon);