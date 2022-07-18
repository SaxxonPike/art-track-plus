import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function ButtonPageLink({href, ...others}) {
    var navigate = useNavigate();
    var handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return <Button href={href} onClick={handler} {...others}></Button>
}