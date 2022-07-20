import {NavDropdown} from "react-bootstrap";
import ActionIcon from "../icons/action-icon";
import NavDropdownPageLink from "./nav-dropdown-page-link";
import paths from "../../paths";
import PlusIcon from "../icons/plus-icon";
import ListIcon from "../icons/list-icon";
import RunIcon from "../icons/run-icon";
import SignOutIcon from "../icons/sign-out-icon";
import React, {memo} from "react";
import names from "../../names";

function UserNavActionsDropdown() {
    return (
        <NavDropdown title={
            <>
                <ActionIcon/>
                <span className={"d-none d-md-inline"}>
                    {" Actions"}
                </span>
            </>
        }>
            <NavDropdownPageLink href={paths.artistRapidEntry}
                                 title={"Quickly add new " + names.vendors + " to the list."}>
                <PlusIcon/>
                {" Rapid New " + names.vendorCap + " Entry"}
            </NavDropdownPageLink>
            <NavDropdownPageLink href={paths.roomRapidEntry}
                                 title={"Quickly enter room numbers for " + names.vendors + "."}>
                <ListIcon/>
                {" Rapid Room Entry"}
            </NavDropdownPageLink>
            <NavDropdown.Divider/>
            <NavDropdownPageLink className={"text-lottery"} href={paths.runLottery}
                                 title={"Run the lottery."}>
                <RunIcon/>
                {" Run Lottery"}
            </NavDropdownPageLink>
            <NavDropdownPageLink className={"text-warning"} href={paths.closeOutDay}
                                 title={"Sign everyone out."}>
                <SignOutIcon/>
                {" Close Out Day"}
            </NavDropdownPageLink>
        </NavDropdown>
    );
}

export default memo(UserNavActionsDropdown);