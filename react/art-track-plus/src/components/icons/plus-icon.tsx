import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function PlusIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faPlus}/>
    );
}

export default memo(PlusIcon);