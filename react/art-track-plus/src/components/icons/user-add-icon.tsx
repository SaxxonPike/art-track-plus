import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function UserAddIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faUserPlus}/>
    );
}

export default memo(UserAddIcon);