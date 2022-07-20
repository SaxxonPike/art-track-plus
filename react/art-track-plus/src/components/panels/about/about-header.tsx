import React, {memo} from "react";
import "./about-header.scss";
import names from "../../../names";

function AboutHeader() {
    return (
        <div className={"about-header"}>
            <h1 className={"text-center"}>
                {names.app}
            </h1>
        </div>
    )
}

export default memo(AboutHeader);