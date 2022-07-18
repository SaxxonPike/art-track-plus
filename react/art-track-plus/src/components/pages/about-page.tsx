import React from "react";
import "./about-page.scss";
import UserNav from "../navs/user-nav";
import AboutPanel from "../panels/about/about-panel";

export default function AboutPage() {
    return (
        <div className={"about-page"}>
            <UserNav/>
            <AboutPanel/>
        </div>
    )
}