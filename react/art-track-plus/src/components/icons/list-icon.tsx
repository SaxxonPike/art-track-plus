import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ListIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faList}/>
    );
}

export default memo(ListIcon);