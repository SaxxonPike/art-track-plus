import React, {memo} from "react";
import {Container} from "react-bootstrap";
import ColumnsPanel from "../panels/columns/columns-panel";

function ScreenTwoPage(props) {
    return (
        <div className={"columns-page screen-two-page"}>
            <Container fluid={true}>
                <ColumnsPanel {...props} partial={true}/>
            </Container>
        </div>
    )
}

export default memo(ScreenTwoPage);