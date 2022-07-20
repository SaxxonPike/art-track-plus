import React, {memo} from "react";
import UserNav from "../navs/user-nav";
import ReportsPanel from "../panels/reports/reports-panel";
import {Container} from "react-bootstrap";

function ReportsPage(props) {
    return (
        <div className={"reports-page"}>
            <UserNav {...props}/>
            <Container>
                <ReportsPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(ReportsPage);