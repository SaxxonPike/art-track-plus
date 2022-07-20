import React, {memo} from "react";
import "./about-page.scss";
import UserNav from "../navs/user-nav";
import AboutPanel from "../panels/about/about-panel";
import {Container} from "react-bootstrap";

function AboutPage(props) {
    return (
        <div className={"about-page"}>
            <UserNav {...props}/>
            <Container>
                <AboutPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(AboutPage);