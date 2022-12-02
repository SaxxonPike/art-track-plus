import React, {memo, useState} from "react";
import {Row} from "react-bootstrap";
import names from "../../../names";
import ActionIcon from "../../icons/action-icon";
import LotteryIcon from "../../icons/lottery-icon";
import CrumbIcon from "../../icons/crumb-icon";
import LotteryPanelForm from "./lottery-panel-form";
import paths from "../../../paths";
import {useNavigate} from "react-router-dom";
import {AppActions} from "../../../app-actions";
import "./lottery-panel.scss";
import {format} from "date-fns";

interface Props {
    actions: AppActions
}

interface State {
    seats: string
    prioritizeUnlucky: boolean
    runDate: string
}

function LotteryPanel({actions}: Props) {

    const initialState = {
        seats: '',
        prioritizeUnlucky: true,
        runDate: format(new Date(), "EEEE")
    };

    const [state, setState] = useState<State>(initialState);

    const navigate = useNavigate();

    function doCancel() {
        navigate(paths.actions);
    }

    function doChange(newState) {
        setState({
            ...state,
            ...newState
        });
    }

    function doRun() {
        const seatsNum = Number(state.seats);
        if (!state.seats || seatsNum < 0) {
            return;
        }

        const actualDay = state.runDate || format(new Date(), "EEEE");

        console.log(`Running lottery for ${seatsNum} artists.`);

        actions.runLottery(seatsNum, actualDay, state.prioritizeUnlucky)
            .then(() => actions.openToast({
                header: `Lottery run.`,
                body: `Lottery has run for ${seatsNum} seats.`
            }))
            .then(() => navigate(paths.columns));
    }

    return (
        <div className={"lottery-panel my-3"}>
            <h1 className={"text-center"}>
                <ActionIcon/>
                {" "}
                <CrumbIcon/>
                {" "}
                <LotteryIcon/>
                {" Run Lottery"}
            </h1>
            <hr/>
            <h5>
                Running the lottery will perform the following:
            </h5>
            <ul>
                <li>
                    All {names.vendors} are signed out. Lottery eligibility is not changed.
                </li>
                <li>
                    All {names.vendors} marked as <strong>guaranteed</strong> will be added to the lottery winners.
                </li>
                <li>
                    A random selection of {names.vendors} marked as <strong>lottery eligible</strong> will be added to
                    the lottery as winners.
                </li>
                <li>
                    {names.vendorsCap} are drawn until either of the following happens:
                    <ul>
                        <li>All available lottery seats are filled. Guaranteed winners count toward the total.</li>
                        <li>There are no more eligible artists to add.</li>
                    </ul>
                </li>
            </ul>
            <hr/>
            <h5>
                Additional options:
            </h5>
            <ul>
                <li>
                    <strong>Not-yet-seated preference</strong>:
                    If enabled, {names.vendors} who have signed up and not been seated will be preferred in the next
                    lottery, if they are eligible.
                </li>
            </ul>
            <hr/>
            <Row>
                <LotteryPanelForm onChange={doChange}
                                  onCancel={doCancel}
                                  onRun={doRun}
                                  enabled={!!state.seats}
                />
            </Row>
        </div>
    );
}

export default memo(LotteryPanel);
