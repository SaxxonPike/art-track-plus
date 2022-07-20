import {NavDropdown} from "react-bootstrap";
import ReportIcon from "../icons/report-icon";
import NavDropdownPageLink from "./nav-dropdown-page-link";
import paths from "../../paths";
import ExportCsvIcon from "../icons/export-csv-icon";
import React, {memo} from "react";
import names from "../../names";

function UserNavReportsDropdown() {
    return (
        <NavDropdown title={
            <>
                <ReportIcon/>
                <span className={"d-none d-md-inline"}>
                    {" Reports"}
                </span>
            </>
        }>
            <NavDropdownPageLink href={paths.reports}
                                 title={"Export " + names.vendor + " lists to a CSV file."}>
                <ExportCsvIcon/>
                {" Export to CSV"}
            </NavDropdownPageLink>
        </NavDropdown>
    );
}

export default memo(UserNavReportsDropdown);