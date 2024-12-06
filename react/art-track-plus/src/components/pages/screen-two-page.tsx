import React, {memo} from "react";
import {Container} from "react-bootstrap";
import ColumnsPanel from "../panels/columns/columns-panel";
import "./columns-page.scss";

function ScreenTwoPage(props) {
    return (
        <div className={"columns-page screen-two-page without-nav"}>
            <Container fluid={true} className={"columns-container"}>
                <ColumnsPanel {...props} partial={true}/>
            </Container>
        </div>
    )
}

export default memo(ScreenTwoPage);