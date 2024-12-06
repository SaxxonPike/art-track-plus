import {Table} from "react-bootstrap";
import React, {memo} from "react";
import FindResult from "../../../models/find-result";
import {Link} from "react-router-dom";

export interface Props {
    rows: FindResult[],
    query: string
}

function FindPanelResultTable({rows, query}: Props) {
    const rowElements = (rows ?? [])
        .map((row) => {
            return (
                <tr key={row.name + row.type + row.matchedOn}>
                    <td>{row.type}</td>
                    <td>{row.matchedOn}</td>
                    <td>
                        <Link to={row.link}>
                            {row.name}
                        </Link>
                    </td>
                </tr>
            );
        })

    if (rowElements.length < 1) {
        const message = query ? "No results."
            : "Waiting for search term.";

        rowElements.push(
            <tr key={"no-results"}>
                <td colSpan={3}>
                    {message}
                </td>
            </tr>
        );
    }

    return (
        <Table striped={true} hover={true}>
            <thead>
            <tr>
                <th>Type</th>
                <th>Matched On</th>
                <th>Item</th>
            </tr>
            </thead>
            <tbody>
            {rowElements}
            </tbody>
        </Table>
    );
}

export default memo(FindPanelResultTable);