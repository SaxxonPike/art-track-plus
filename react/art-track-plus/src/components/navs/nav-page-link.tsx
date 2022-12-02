import React, {memo} from "react";
import {Nav, NavLinkProps} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export interface Props extends NavLinkProps {
    href: string
    handler?: (e) => void
    target?: string
}

function NavPageLink({href, handler, ...others}: Props) {
    const navigate = useNavigate();
    if (!handler) {
        handler = e => {
            e.preventDefault();
            navigate(href);
        };
    }
    return (<Nav.Item>
        <Nav.Link href={`/#${href}`}
                  onClick={handler}
                  tabIndex={0}
                  {...others}>
        </Nav.Link>
    </Nav.Item>);
}

export default memo(NavPageLink);