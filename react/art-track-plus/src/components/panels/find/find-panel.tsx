import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {AppActions} from "../../../app-actions";
import FindResult from "../../../models/find-result";
import FindPanelResultTable from "./find-panel-result-table";
import SearchIcon from "../../icons/search-icon";

export interface Props {
    actions: AppActions
}

interface State {
    results: FindResult[],
    query: string
}

function FindPanel({actions}: Props) {
    const [state, setState] = useState<State>({
        results: [],
        query: ""
    });

    let textBox;

    useEffect(() => {
        textBox.focus();
    });

    function setTextBox(ref) {
        textBox = ref;
    }

    function doQuery() {
        setState({
            query: textBox.value,
            results: actions.find(textBox.value)
        });
    }

    return (
        <div className={"create-backup-panel my-3"}>
            <h1 className={"text-center mb-3"}>
                <SearchIcon/>
                {" Find"}
            </h1>
            <hr/>
            <Form className={"my-4"}>
                <Form.Control type={"text"}
                              onChange={doQuery}
                              ref={setTextBox}
                              placeholder={"(start typing and results will be shown below)"}
                              aria-autocomplete={"none"}/>
            </Form>
            <hr/>
            <FindPanelResultTable rows={state.results}
                                  query={state.query}/>
        </div>
    );
}

export default FindPanel;
