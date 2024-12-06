import React from "react";
import {memo} from "react";

export interface Props {
    records: string[][]
}

function ImportMappingPanel({records, ...props}: Props) {
    return <div>Records found: <span>{records.length}</span></div>;
}

export default memo(ImportMappingPanel);
