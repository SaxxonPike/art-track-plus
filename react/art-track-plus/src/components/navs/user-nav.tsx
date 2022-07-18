import './user-nav.scss';
import {Component} from "react";
import React from 'react';
import {Nav, NavDropdown} from "react-bootstrap";
import paths from "../../paths";
import {appName} from "../../facts";
import {Navbar} from "react-bootstrap";
import DatabaseIcon from "../icons/database-icon";
import AboutIcon from "../icons/about-icon";
import NavDropdownPageLink from "./nav-dropdown-page-link";
import NavBrandPageLink from "./nav-brand-page-link";
import ExportCsvIcon from "../icons/export-csv-icon";
import SearchIcon from "../icons/search-icon";
import PlusIcon from "../icons/plus-icon";
import ListIcon from "../icons/list-icon";
import RunIcon from "../icons/run-icon";
import SignOutIcon from "../icons/sign-out-icon";
import NavPageLink from "./nav-page-link";
import ScreenIcon from "../icons/screen-icon";

class UserNav extends Component {
    render() {
        return (
            <Navbar className={"user-nav"}>
                <NavBrandPageLink href={paths.columns}>{appName}</NavBrandPageLink>
                <Navbar.Toggle aria-controls={"user-nav-collapse"}/>
                <Navbar.Collapse id={"user-nav-collapse"}>
                    <Nav className={"me-auto"}>
                        <NavDropdown title={"System"}>
                            <NavDropdownPageLink href={paths.createBackup} title={"Backup lists to a JSON file."}>
                                <DatabaseIcon/>
                                {" Backup to File"}
                            </NavDropdownPageLink>
                            <NavDropdownPageLink href={paths.restoreBackup} title={"Restore lists from a JSON backup."}>
                                <DatabaseIcon/>
                                {" Restore Backup"}
                            </NavDropdownPageLink>
                            <NavDropdown.Divider/>
                            <NavDropdownPageLink className={"text-warning"} href={paths.rawData}
                                                 title={"Surgically modify artist data."}>
                                <DatabaseIcon/>
                                {" Raw Data Editor"}
                            </NavDropdownPageLink>
                            <NavDropdownPageLink className={"text-danger"} href={paths.wipe} title={"Wipe all lists."}>
                                <DatabaseIcon/>
                                {" Wipe Everything"}
                            </NavDropdownPageLink>
                            <NavDropdownPageLink className={"text-danger"} href={paths.testData}
                                                 title={"For testing purposes. Generate random artist data."}>
                                <DatabaseIcon/>
                                {" Generate Test Data"}
                            </NavDropdownPageLink>
                            <NavDropdown.Divider/>
                            <NavDropdownPageLink href={paths.about} title={"Read more about this application."}>
                                <AboutIcon/>
                                {" About " + appName}
                            </NavDropdownPageLink>
                        </NavDropdown>
                        <NavDropdown title={"Reports"}>
                            <NavDropdownPageLink href={paths.exportCsv} title={"Export artist lists to a CSV file."}>
                                <ExportCsvIcon/>
                                {" Export to CSV"}
                            </NavDropdownPageLink>
                        </NavDropdown>
                        <NavDropdown title={"Find"}>
                            <NavDropdownPageLink href={paths.findArtistByTable}
                                                 title={"Find an artist with a specific table number."}>
                                <SearchIcon/>
                                {" Artist by Table Number"}
                            </NavDropdownPageLink>
                            <NavDropdownPageLink href={paths.findArtistByBadge}
                                                 title={"Find an artist with a specific badge number."}>
                                <SearchIcon/>
                                {" Artist by Badge Number"}
                            </NavDropdownPageLink>
                            <NavDropdownPageLink href={paths.findCheckedOutArtists}
                                                 title={"Find artists who were in today and have checked out."}>
                                <SearchIcon/>
                                {" Checked Out Artists"}
                            </NavDropdownPageLink>
                        </NavDropdown>
                        <NavDropdown title={"Actions"}>
                            <NavDropdownPageLink href={paths.artistRapidEntry} title={"Quickly add new artists to the list."}>
                                <PlusIcon/>
                                {" Rapid New Artist Entry"}
                            </NavDropdownPageLink>
                            <NavDropdownPageLink href={paths.roomRapidEntry} title={"Quickly enter room numbers for artists."}>
                                <ListIcon/>
                                {" Rapid Room Entry"}
                            </NavDropdownPageLink>
                            <NavDropdown.Divider/>
                            <NavDropdownPageLink className={"text-lottery"} href={paths.runLottery} title={"Run the lottery."}>
                                <RunIcon/>
                                {" Run Lottery"}
                            </NavDropdownPageLink>
                            <NavDropdownPageLink className={"text-warning"} href={paths.closeOutDay} title={"Sign everyone out."}>
                                <SignOutIcon/>
                                {" Close Out Day"}
                            </NavDropdownPageLink>
                        </NavDropdown>
                        <NavPageLink href={paths.addArtist} title={"Add a new artist."}>
                            <PlusIcon/>
                            {" New Artist"}
                        </NavPageLink>
                        <NavPageLink href={paths.secondScreen} title={"Open a new read-only view for use on a second screen."}>
                            <ScreenIcon/>
                            {" View 2"}
                        </NavPageLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default UserNav;
