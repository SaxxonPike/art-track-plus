import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SignInIcon() {
    return (
        <FontAwesomeIcon icon={faRightToBracket}/>
    );
}

export default memo(SignInIcon);