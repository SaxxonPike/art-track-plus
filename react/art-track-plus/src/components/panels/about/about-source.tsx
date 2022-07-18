import React from "react";
import "./about-source.scss";
import {appName} from "../../../facts";
import {Button} from "react-bootstrap";
import {faCodeFork} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function AboutSource() {
    return (
        <div className={"about-source"}>
            <h3 className={"text-center"}>
                Open Source
            </h3>
            <p>
                The source code for {appName} is available on GitHub. There, you can check out the code, report issues,
                get the latest updates and submit pull requests if you have useful modifications.
            </p>
            <p className={"text-center"}>
                <Button variant={"secondary"} href={"https://github.com/saxxonpike/art-track-plus/"}>
                    <FontAwesomeIcon icon={faCodeFork}/> saxxonpike/art-track-plus
                </Button>
            </p>
        </div>
    )
}