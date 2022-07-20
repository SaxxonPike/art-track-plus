import React, {memo} from "react";
import "./columns-page.scss";
import UserNav from "../navs/user-nav";
import CreateBackupPanel from "../panels/create-backup/create-backup-panel";
import {Container} from "react-bootstrap";

function DatabasePage(props) {
    return (
        <div className={"create-backup-page"}>
            <UserNav activeTab={"reports"} {...props}/>
            <Container>
                <CreateBackupPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(DatabasePage);