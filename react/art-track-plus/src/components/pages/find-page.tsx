import React, {memo} from "react";
import "./about-page.scss";
import UserNav from "../navs/user-nav";
import {Container} from "react-bootstrap";
import FindPanel from "../panels/find/find-panel";
import tabs from "./tabs";

function FindPage(props) {
    return (
        <div className={"find-page"}>
            <UserNav activeTab={tabs.find} {...props}/>
            <Container>
                <FindPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(FindPage);