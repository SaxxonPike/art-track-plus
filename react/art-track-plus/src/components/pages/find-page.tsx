import React, {memo} from "react";
import "./about-page.scss";
import UserNav from "../navs/user-nav";
import {Container} from "react-bootstrap";
import FindPanel from "../panels/find/find-panel";

function FindPage(props) {
    return (
        <div className={"find-page"}>
            <UserNav {...props}/>
            <Container>
                <FindPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(FindPage);