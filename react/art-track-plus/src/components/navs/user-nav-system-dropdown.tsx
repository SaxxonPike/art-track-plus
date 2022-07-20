import {NavDropdown} from "react-bootstrap";
import SettingsIcon from "../icons/settings-icon";
import NavDropdownPageLink from "./nav-dropdown-page-link";
import paths from "../../paths";
import DatabaseIcon from "../icons/database-icon";
import AboutIcon from "../icons/about-icon";
import React, {memo} from "react";
import names from "../../names";

function UserNavSystemDropdown() {
    return (
        <NavDropdown title={
            <>
                <SettingsIcon/>
                <span className={"d-none d-md-inline"}>
                    {" System"}
                </span>
            </>
        }>
        <NavDropdownPageLink href={paths.database}
                             title={"Create and restore backups."}>
            <DatabaseIcon/>
            {" Database"}
        </NavDropdownPageLink>
        <NavDropdown.Divider/>
        <NavDropdownPageLink href={paths.about}
                             title={"Read more about this application."}>
            <AboutIcon/>
            {" About " + names.app}
        </NavDropdownPageLink>
    </NavDropdown>
    );
}

export default memo(UserNavSystemDropdown);