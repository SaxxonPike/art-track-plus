import React, {memo} from "react";
import "./about-panel.scss";
import AboutHeader from "./about-header";
import AboutLicense from "./about-license";
import AboutFooter from "./about-footer";
import AboutSource from "./about-source";

function AboutPanel() {
    return (
        <div className={"about-panel my-3"}>
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

export default memo(AboutPanel);