import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function CancelIcon(props) {
    return (
        <FontAwesomeIcon{...props}  icon={faAngleLeft}/>
    );
}

export default memo(CancelIcon);
