import React, {memo, useState} from "react";
import "./about-page.scss";
import UserNav from "../navs/user-nav";
import {Container} from "react-bootstrap";
import tabs from "./tabs";
import ImportColumnPanel from "../panels/import/import-column-panel";
import ImportMappingPanel from "../panels/import/import-mapping-panel";
import {AppActions} from "../../app-actions";
import columnsColumn from "../panels/columns/columns-column";
import ActionIcon from "../icons/action-icon";
import UserAddIcon from "../icons/user-add-icon";
import BasePanel from "../panels/base-panel";
import names from "../../names";

export interface State {
    records: string[][]
}

export interface Props {
    actions: AppActions
}

function ImportPage({actions, ...props}: Props) {
    const initialState: State = {
        records: []
    };

    const [state, setState] = useState<State>(initialState);

    function onSetRecords(records: string[][]) {
        setState({
            records: records
        });
    }

    function getImportColumnPanel() {
        return (<ImportColumnPanel key={"ImportColumnPanel"}
                                   onSetRecords={onSetRecords}
                                   {...props}/>);
    }

    function getImportMappingPanel() {
        return (<ImportMappingPanel key={"ImportMappingPanel"}
                                    records={state.records}
                                    {...props}/>);
    }

    // When no columns are present, ask for a CSV file.
    // When columns are present, show column mapping options.
    const columnsAbsent = !state.records || state.records.length < 1;

    const panel = columnsAbsent
        ? getImportColumnPanel() : getImportMappingPanel();

    const crumbs = [
        <ActionIcon key={"ImportColumnCrumb0"}/>,
        <UserAddIcon key={"ImportColumnCrumb1"}/>
    ];

    return (
        <div className={"import-page"}>
            <UserNav activeTab={tabs.tools} {...props}/>
            <Container>
                <BasePanel className={"import-column-panel"}
                           title={`Import ${names.vendorsCap}`}
                           crumbs={crumbs}
                           key="ImportPagePanel">
                    {panel}
                </BasePanel>
            </Container>
        </div>
    );
}

export default memo(ImportPage);