import React, {memo} from "react";
import {NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function NavDropdownPageLink({href, ...others}) {
    const navigate = useNavigate();
    const handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return <NavDropdown.Item href={href} onClick={handler} {...others}></NavDropdown.Item>
}

NavDropdownPageLink.propTypes = {
    href: PropTypes.string
};

export default memo(NavDropdownPageLink);