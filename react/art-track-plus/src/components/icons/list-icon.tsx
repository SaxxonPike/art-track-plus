import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ListIcon() {
    return (
        <FontAwesomeIcon icon={faList}/>
    );
}

export default memo(ListIcon);