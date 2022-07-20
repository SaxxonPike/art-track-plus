import React, {memo} from "react";
import "./columns-page.scss";
import UserNav from "../navs/user-nav";
import CreateBackupPanel from "../panels/create-backup/create-backup-panel";
import {Container} from "react-bootstrap";

function CreateBackupPage(props) {
    return (
        <div className={"create-backup-page"}>
            <UserNav {...props}/>
            <Container>
                <CreateBackupPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(CreateBackupPage);