import React, {memo} from "react";
import {Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function NavBrandPageLink({href, ...others}) {
    var navigate = useNavigate();
    var handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return <Navbar.Brand href={href} onClick={handler} {...others}></Navbar.Brand>
}

export default memo(NavBrandPageLink);