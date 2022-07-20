import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function PlusIcon() {
    return (
        <FontAwesomeIcon icon={faPlus}/>
    );
}

export default memo(PlusIcon);