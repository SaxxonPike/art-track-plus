import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function UserIcon() {
    return (
        <FontAwesomeIcon icon={faUser}/>
    );
}

export default memo(UserIcon);