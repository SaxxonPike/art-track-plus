import React, {memo} from "react";
import {Nav} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function NavPageLink({href, ...others}) {
    const navigate = useNavigate();
    const handler = e => {
        e.preventDefault();
        navigate(href);
    };
    return (<Nav.Item>
        <Nav.Link href={href}
                  onClick={handler}
                  {...others}>

        </Nav.Link>
    </Nav.Item>);
}

NavPageLink.propTypes = {
    href: PropTypes.string
};

export default memo(NavPageLink);