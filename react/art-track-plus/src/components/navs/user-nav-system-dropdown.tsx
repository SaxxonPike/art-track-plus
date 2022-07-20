import {NavDropdown} from "react-bootstrap";
import SettingsIcon from "../icons/settings-icon";
import NavDropdownPageLink from "./nav-dropdown-page-link";
import paths from "../../paths";
import DatabaseIcon from "../icons/database-icon";
import AboutIcon from "../icons/about-icon";
import {appName} from "../../facts";
import React, {memo} from "react";
import MenuMoreIcon from "../icons/menu-more-icon";

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
        <NavDropdownPageLink href={paths.createBackup}
                             title={"Create and restore backups."}>
            <DatabaseIcon/>
            {" Database"}
        </NavDropdownPageLink>
        <NavDropdown.Divider/>
        <NavDropdownPageLink className={"text-warning"}
                             href={paths.rawData}
                             title={"Surgically modify artist data."}>
            <DatabaseIcon/>
            {" Raw Data Editor"}
        </NavDropdownPageLink>
        <NavDropdownPageLink className={"text-danger"} href={paths.wipe} title={"Wipe all lists."}>
            <DatabaseIcon/>
            {" Wipe Everything"}
        </NavDropdownPageLink>
        <NavDropdownPageLink className={"text-danger"}
                             href={paths.testData}
                             title={"For testing purposes. Generate random artist data."}>
            <DatabaseIcon/>
            {" Generate Test Data"}
        </NavDropdownPageLink>
        <NavDropdown.Divider/>
        <NavDropdownPageLink href={paths.about}
                             title={"Read more about this application."}>
            <AboutIcon/>
            {" About " + appName}
        </NavDropdownPageLink>
    </NavDropdown>
    );
}

export default memo(UserNavSystemDropdown);