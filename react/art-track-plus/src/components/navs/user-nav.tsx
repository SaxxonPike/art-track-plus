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
import UserNavReportsDropdown from "./user-nav-reports-dropdown";
import UserNavSearchDropdown from "./user-nav-search-dropdown";
import UserNavActionsDropdown from "./user-nav-actions-dropdown";

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
                <UserNavReportsDropdown/>
                <UserNavSearchDropdown/>
                <UserNavActionsDropdown/>
                <NavPageLink href={paths.addArtist}
                             title={"Add a new artist."}>
                    <PlusIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" New Artist"}
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
