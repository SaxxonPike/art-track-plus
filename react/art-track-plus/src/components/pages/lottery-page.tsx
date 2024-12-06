import React, {memo} from "react";
import "./columns-page.scss";
import UserNav from "../navs/user-nav";
import LotteryPanel from "../panels/lottery/lottery-panel";
import {Container} from "react-bootstrap";
import tabs from "./tabs";

function LotteryPage(props) {
    return (
        <div className={"lottery-page"}>
            <UserNav activeTab={tabs.tools} {...props}/>
            <Container>
                <LotteryPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(LotteryPage);