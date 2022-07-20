import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function HomeIcon() {
    return (
        <FontAwesomeIcon icon={faHome}/>
    );
}

export default memo(HomeIcon);