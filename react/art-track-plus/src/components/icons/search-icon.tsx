import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SearchIcon() {
    return (
        <FontAwesomeIcon icon={faSearch}/>
    );
}

export default memo(SearchIcon);