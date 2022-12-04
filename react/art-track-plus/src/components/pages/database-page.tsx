import React, {memo} from "react";
import "./columns-page.scss";
import UserNav from "../navs/user-nav";
import DatabasePanel from "../panels/database/database-panel";
import {Container} from "react-bootstrap";
import tabs from "./tabs";

function DatabasePage(props) {
    return (
        <div className={"database-page"}>
            <UserNav activeTab={tabs.system} {...props}/>
            <Container>
                <DatabasePanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(DatabasePage);