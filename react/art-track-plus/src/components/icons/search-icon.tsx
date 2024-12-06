import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SearchIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faSearch}/>
    );
}

export default memo(SearchIcon);