import React from "react";
import {Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function NavBrandPageLink({href, ...others}) {
    var navigate = useNavigate();
    var handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return <Navbar.Brand href={href} onClick={handler} {...others}></Navbar.Brand>
}