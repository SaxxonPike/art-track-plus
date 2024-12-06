import React, {memo} from "react";
import {NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {DropdownItemProps} from "react-bootstrap/DropdownItem";

export interface Props extends DropdownItemProps {
    href: string
}

function NavDropdownPageLink({href, ...others}: Props) {
    const navigate = useNavigate();
    const handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return <NavDropdown.Item href={href} onClick={handler} {...others}></NavDropdown.Item>
}

export default memo(NavDropdownPageLink);