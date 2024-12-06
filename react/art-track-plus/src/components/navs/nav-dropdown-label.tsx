import React, {memo} from "react";
import {NavDropdown} from "react-bootstrap";
import {NavDropdownProps} from "react-bootstrap/NavDropdown";

export interface NavDropdownLabelProps extends NavDropdownProps {
    icon?: React.ReactNode
}

function NavDropdownLabel(props: NavDropdownLabelProps) {
    const {icon, title, children, ...props0} = props;

    return (
        <NavDropdown title={<>{icon}{title}</>} children={children} {...props0}/>
    );
}

export default memo(NavDropdownLabel);