import React from "react";
import "./about-panel.scss";
import AboutHeader from "./about-header";
import AboutLicense from "./about-license";
import AboutFooter from "./about-footer";
import AboutSource from "./about-source";

export default function AboutPanel() {
    return (
        <div className={"about-panel"}>
            <div className={"screen limited-width"}>
                <div className={"content"}>
                    <AboutHeader/>
                    <hr/>
                    <AboutLicense/>
                    <hr/>
                    <AboutSource/>
                    <hr/>
                    <AboutFooter/>
                </div>
            </div>
        </div>
    )
}