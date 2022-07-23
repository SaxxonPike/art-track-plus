import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function DeleteIcon(props) {
    return (
        <FontAwesomeIcon{...props}  icon={faClose}/>
    );
}

export default memo(DeleteIcon);
