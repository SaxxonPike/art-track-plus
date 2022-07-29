import React, {memo} from "react";
import {Nav, NavLinkProps} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export interface Props extends NavLinkProps {
    href: string
}

function NavPageLink({href, ...others}: Props) {
    const navigate = useNavigate();
    const handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return (<Nav.Item>
        <Nav.Link href={href}
                  onClick={handler}
                  tabIndex={0}
                  {...others}>

        </Nav.Link>
    </Nav.Item>);
}

export default memo(NavPageLink);