import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDatabase} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function DatabaseIcon(props) {
    return (
        <FontAwesomeIcon{...props}  icon={faDatabase}/>
    );
}

export default memo(DatabaseIcon);