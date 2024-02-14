import React, {memo} from "react";
import {Button, ButtonProps} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

interface Props extends ButtonProps {
    href: string
}

function ButtonPageLink({href, ...others}: Props) {
    const navigate = useNavigate();
    const handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return <Button href={href} onClick={handler} {...others}></Button>
}

export default memo(ButtonPageLink);
