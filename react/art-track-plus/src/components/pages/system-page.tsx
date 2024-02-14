import React, {memo} from "react";
import UserNav from "../navs/user-nav";
import {Container} from "react-bootstrap";
import SystemPanel from "../panels/system/system-panel";
import tabs from "./tabs";

function SystemPage(props) {
    return (
        <div className={"reports-page"}>
            <UserNav activeTab={tabs.system} {...props}/>
            <Container>
                <SystemPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(SystemPage);