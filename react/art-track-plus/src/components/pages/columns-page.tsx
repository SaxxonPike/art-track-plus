import React from "react";
import "./columns-page.scss";
import UserNav from "../navs/user-nav";
import ColumnsPanel from "../panels/columns/columns-panel";

export default function ColumnsPage() {
    return (
        <div className={"columns-page"}>
            <UserNav/>
            <ColumnsPanel/>
        </div>
    )
}