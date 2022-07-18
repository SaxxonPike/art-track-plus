import React from "react";
import "./about-header.scss";
import {appName} from "../../../facts";

export default function AboutHeader() {
    return (
        <div className={"about-header"}>
            <h1 className={"text-center"}>
                {appName}
            </h1>
        </div>
    )
}