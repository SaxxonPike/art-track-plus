import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {memo} from "react";

function MenuMoreIcon() {
    return (
        <FontAwesomeIcon className={"text-muted"} icon={faArrowRight}/>
    );
}

export default memo(MenuMoreIcon);