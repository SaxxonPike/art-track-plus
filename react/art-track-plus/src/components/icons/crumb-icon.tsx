import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function CrumbIcon(props) {
    return (
        <FontAwesomeIcon{...props} className={"text-muted"} icon={faAngleRight}/>
    );
}

export default memo(CrumbIcon);
