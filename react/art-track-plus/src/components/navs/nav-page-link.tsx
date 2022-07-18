import React from "react";
import {Nav} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function NavPageLink({href, ...others}) {
    var navigate = useNavigate();
    var handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return <Nav.Link href={href} onClick={handler} {...others}></Nav.Link>
}