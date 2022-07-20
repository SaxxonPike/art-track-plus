import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function TrashIcon() {
    return (
        <FontAwesomeIcon icon={faTrash}/>
    );
}

export default memo(TrashIcon);