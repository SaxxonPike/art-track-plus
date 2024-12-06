import React, {memo} from "react";
import "./about-source.scss";
import {Button} from "react-bootstrap";
import {faCodeFork} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BlockButtonGroup from "../../buttons/block-button-group";
import names from "../../../names";

function AboutSource() {
    return (
        <div className={"about-source"}>
            <h3 className={"text-center"}>
                Open Source
            </h3>
            <p>
                The source code for {names.app} is available on GitHub. There, you can check out the code, report issues,
                get the latest updates and submit pull requests if you have useful modifications.
            </p>
            <BlockButtonGroup>
                <Button variant={"secondary"} href={"https://github.com/saxxonpike/art-track-plus/"}>
                    <FontAwesomeIcon icon={faCodeFork}/> saxxonpike/art-track-plus
                </Button>
            </BlockButtonGroup>
        </div>
    )
}

export default memo(AboutSource);