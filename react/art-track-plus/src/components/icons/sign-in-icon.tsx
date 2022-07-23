import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SignInIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faRightToBracket}/>
    );
}

export default memo(SignInIcon);