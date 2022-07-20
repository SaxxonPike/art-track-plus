import React, {memo} from "react";
import {NavDropdown} from "react-bootstrap";
import {NavDropdownProps} from "react-bootstrap/NavDropdown";
import PropTypes from "prop-types";

export interface NavDropdownLabelProps extends NavDropdownProps {
    icon?: React.ReactNode
}

function NavDropdownLabel(props: NavDropdownLabelProps) {
    const {icon, title, children, ...props0} = props;

    return (
        <NavDropdown title={<>{icon}{title}</>} children={children} {...props0}/>
    );
}

NavDropdownLabel.propTypes = {
    href: PropTypes.string
};

export default memo(NavDropdownLabel);