import React, {memo} from "react";
import {add, format} from "date-fns";
import {Form, FormSelectProps} from "react-bootstrap";

export interface Props extends FormSelectProps {
    today: Date,
    selected?: string,
    onDayChange?: (value: string) => void,
    ref?: (any) => void
}

function DaysStartingTodayInput({today, selected, onDayChange, ...props}: Props) {
    let formSelect;

    const dayStrings = [0, 1, 2, 3, 4, 5, 6]
        .map(i => ({index: i, day: format(add(today, {days: i}), "EEEE")}));

    const actuallySelected = selected ? selected : dayStrings[0];

    const dayOptions = dayStrings
        .map(x => {
            return <option selected={actuallySelected == x.day}
                           key={`day${x.index}`}>
                {`${x.day}${x.index == 0 ? " (today)" : ""}`}
            </option>
        });

    function doChange() {
        if (!onDayChange)
            return;

        const idx = formSelect.selectedIndex;
        if (idx) {
            onDayChange(dayStrings[idx].day);
        } else {
            onDayChange(null);
        }
    }

    return (<Form.Select onChange={doChange}
                         ref={r => formSelect = r}
                         {...props}>
        {dayOptions}
    </Form.Select>)
}

export default memo(DaysStartingTodayInput);
