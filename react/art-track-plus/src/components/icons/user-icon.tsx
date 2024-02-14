import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function UserIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faUser}/>
    );
}

export default memo(UserIcon);