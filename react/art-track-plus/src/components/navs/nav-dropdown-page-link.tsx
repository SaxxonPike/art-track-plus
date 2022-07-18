import React from "react";
import {NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function NavDropdownPageLink({href, ...others}) {
    var navigate = useNavigate();
    var handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return <NavDropdown.Item href={href} onClick={handler} {...others}></NavDropdown.Item>
}