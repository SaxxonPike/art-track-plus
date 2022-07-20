import {NavDropdown} from "react-bootstrap";
import SearchIcon from "../icons/search-icon";
import NavDropdownPageLink from "./nav-dropdown-page-link";
import paths from "../../paths";
import React, {memo} from "react";
import names from "../../names";

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
                                 title={"Find " + names.aVendor + " with a specific table number."}>
                <SearchIcon/>
                {" " + names.vendorCap + " by Table Number"}
            </NavDropdownPageLink>
            <NavDropdownPageLink href={paths.findArtistByBadge}
                                 title={"Find " + names.aVendor + " with a specific badge number."}>
                <SearchIcon/>
                {" " + names.vendorCap + " by Badge Number"}
            </NavDropdownPageLink>
            <NavDropdownPageLink href={paths.findCheckedOutArtists}
                                 title={"Find " + names.vendors + " who were in today and have checked out."}>
                <SearchIcon/>
                {" Checked Out " + names.vendorsCap}
            </NavDropdownPageLink>
        </NavDropdown>
    );
}

export default memo(UserNavSearchDropdown);