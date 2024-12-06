import React, {memo} from "react";
import UserNav from "../navs/user-nav";
import {Container} from "react-bootstrap";
import tabs from "./tabs";
import TestingPanel from "../panels/testing/testing-panel";

function TestingPage(props) {
    return (
        <div className={"testing-page"}>
            <UserNav activeTab={tabs.system} {...props}/>
            <Container>
                <TestingPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(TestingPage);