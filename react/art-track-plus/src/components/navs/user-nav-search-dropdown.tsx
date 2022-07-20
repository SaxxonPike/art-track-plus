import {NavDropdown} from "react-bootstrap";
import SearchIcon from "../icons/search-icon";
import NavDropdownPageLink from "./nav-dropdown-page-link";
import paths from "../../paths";
import React, {memo} from "react";

function UserNavSearchDropdown() {
    return (
        <NavDropdown title={
            <>
                <SearchIcon/>
                <span className={"d-none d-md-inline"}>
                    {" Find"}
                </span>
            </>
        }>
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
    );
}

export default memo(UserNavSearchDropdown);