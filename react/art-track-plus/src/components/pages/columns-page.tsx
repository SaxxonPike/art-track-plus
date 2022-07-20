import React, {memo} from "react";
import "./columns-page.scss";
import UserNav from "../navs/user-nav";
import ColumnsPanel from "../panels/columns/columns-panel";
import {Container} from "react-bootstrap";

function ColumnsPage(props) {
    return (
        <div className={"columns-page"}>
            <UserNav {...props}/>
            <Container fluid={true}>
                <ColumnsPanel {...props}/>
            </Container>
        </div>
    )
}

export default memo(ColumnsPage);