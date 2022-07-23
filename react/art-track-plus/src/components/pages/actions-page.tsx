import React, {memo} from "react";
import "./about-page.scss";
import UserNav from "../navs/user-nav";
import {Container} from "react-bootstrap";
import ActionsPanel from "../panels/actions/actions-panel";
import tabs from "./tabs";

function ActionsPage(props) {
    return (
        <div className={"actions-page"}>
            <UserNav activeTab={tabs.tools} {...props}/>
            <Container>
                <ActionsPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(ActionsPage);