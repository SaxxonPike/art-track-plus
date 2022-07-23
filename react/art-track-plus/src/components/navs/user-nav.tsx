import './user-nav.scss';
import React, {memo} from 'react';
import {Nav} from "react-bootstrap";
import paths from "../../paths";
import {Navbar} from "react-bootstrap";
import NavPageLink from "./nav-page-link";
import ScreenIcon from "../icons/screen-icon";
import HomeIcon from "../icons/home-icon";
import ReportIcon from "../icons/report-icon";
import names from "../../names";
import SearchIcon from "../icons/search-icon";
import ActionIcon from "../icons/action-icon";
import UserAddIcon from "../icons/user-add-icon";
import SettingsIcon from "../icons/settings-icon";
import tabs from "../pages/tabs";

export interface Props {
    activeTab: string
}

function UserNav({activeTab}: Props) {
    return (
        <Navbar className={"user-nav"}>
            <Nav className={"mx-auto"}>
                <NavPageLink href={paths.columns}
                             title={"Return to the main view."}
                             active={activeTab === tabs.home}>
                    <HomeIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" Home"}
                    </span>
                </NavPageLink>
                {/*<UserNavSystemDropdown/>*/}
                <NavPageLink href={paths.system}
                             title={"Configure the app and database."}
                             active={activeTab === tabs.system}>
                    <SettingsIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" System"}
                    </span>
                </NavPageLink>
                <NavPageLink href={paths.reports}
                             title={"Generate reports."}
                             active={activeTab === tabs.reports}>
                    <ReportIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" Reports"}
                    </span>
                </NavPageLink>
                <NavPageLink href={paths.find}
                             title={"Find anything."}
                             active={activeTab === tabs.find}>
                    <SearchIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" Find"}
                    </span>
                </NavPageLink>
                <NavPageLink href={paths.actions}
                             title={"Special tools to make common operations faster."}
                             active={activeTab === tabs.tools}>
                    <ActionIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" Tools"}
                    </span>
                </NavPageLink>
                {/*<UserNavActionsDropdown/>*/}
                <NavPageLink href={paths.addArtist}
                             title={"Add a new " + names.vendor + "."}
                             active={activeTab === tabs.artist}>
                    <UserAddIcon/>
                    <span className={"d-none d-md-inline"}>
                        {" " + names.vendorCap}
                    </span>
                </NavPageLink>
                <NavPageLink href={paths.secondScreen}
                             title={"Open a new read-only view for use on a second screen."}
                             active={activeTab === tabs.view2}>
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
