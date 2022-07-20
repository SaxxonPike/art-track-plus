import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SignOutIcon() {
    return (
        <FontAwesomeIcon icon={faRightFromBracket}/>
    );
}

export default memo(SignOutIcon);