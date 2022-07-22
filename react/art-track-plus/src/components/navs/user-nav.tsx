import './user-nav.scss';
import React, {memo} from 'react';
import {Nav} from "react-bootstrap";
import paths from "../../paths";
import {Navbar} from "react-bootstrap";
import PlusIcon from "../icons/plus-icon";
import NavPageLink from "./nav-page-link";
import ScreenIcon from "../icons/screen-icon";
import HomeIcon from "../icons/home-icon";
import UserNavSystemDropdown from "./user-nav-system-dropdown";
import UserNavActionsDropdown from "./user-nav-actions-dropdown";
import ReportIcon from "../icons/report-icon";
import names from "../../names";
import SearchIcon from "../icons/search-icon";

function UserNav() {
    return (
        <Navbar className={"user-nav"}>
            <Nav className={"mx-auto"}>
                <NavPageLink href={paths.columns} title={"Return to the main view."}>
                    <HomeIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" Home"}
                    </span>
                </NavPageLink>
                <UserNavSystemDropdown/>
                <NavPageLink href={paths.reports}
                             title={"Generate reports."}>
                    <ReportIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" Reports"}
                    </span>
                </NavPageLink>
                <NavPageLink href={paths.find}
                             title={"Find anything."}>
                    <SearchIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" Find"}
                    </span>
                </NavPageLink>
                <UserNavActionsDropdown/>
                <NavPageLink href={paths.addArtist}
                             title={"Add a new " + names.vendor + "."}>
                    <PlusIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" New " + names.vendorCap}
                    </span>
                </NavPageLink>
                <NavPageLink href={paths.secondScreen}
                             title={"Open a new read-only view for use on a second screen."}>
                    <ScreenIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" View 2"}
                    </span>
                </NavPageLink>
            </Nav>
        </Navbar>
    );
}

export default memo(UserNav);
