import React, {memo} from "react";
import "./about-footer.scss";
import {columnsPath} from "../../../paths";
import ButtonPageLink from "../../buttons/button-page-link";
import BlockButtonGroup from "../../buttons/block-button-group";

function AboutFooter() {
    return (
        <div className={"about-footer"}>
            <BlockButtonGroup>
                <ButtonPageLink variant={"primary"} href={columnsPath}>
                    Thank you!
                </ButtonPageLink>
            </BlockButtonGroup>
        </div>
    );
}

export default memo(AboutFooter);