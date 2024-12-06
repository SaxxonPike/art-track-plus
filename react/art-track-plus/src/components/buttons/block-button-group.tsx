import React, {memo} from "react";

function BlockButtonGroup(props) {
    return (
        <div className={"d-grid gap-2"} {...props}/>
    );
}

export default memo(BlockButtonGroup);