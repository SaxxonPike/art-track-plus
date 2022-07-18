import React from "react";
import "./about-footer.scss";
import {columnsPath} from "../../../paths";
import ButtonPageLink from "../../buttons/button-page-link";

export default function AboutFooter() {
    return (
        <div className={"about-footer text-center"}>
            <ButtonPageLink variant={"primary"} href={columnsPath}>
                Thank you!
            </ButtonPageLink>
        </div>
    )
}