import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SignOutIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faRightFromBracket}/>
    );
}

export default memo(SignOutIcon);