import React, {memo} from "react";
import "./columns-panel.scss";
import {Button} from "react-bootstrap";
import {AppActions} from "../../../app-actions";
import {generatePath, Link} from "react-router-dom";
import paths from "../../../paths";

interface Props {
    actions: AppActions
    partial: boolean
}

function ColumnsPanel({actions, partial}: Props) {
    const testClick = () => {
        actions.openModal({
            header: "test header!",
            body: "test body!",
            footer: "test footer!"
        });
    };

    const testToast = () => {
        actions.openToast({
            header: "test header!",
            body: "test body!"
        });
    }

    const artistLinesTemp = actions.getArtists()
        .map(artist => {
            return (
                <li key={"artist-id-" + artist.id}>
                    <Link to={generatePath(paths.editArtist, {artistId: artist.id + ""})}>
                        {artist.name}
                    </Link>
                </li>
            );
        });

    if (partial) {
        return (
            <>
                We would ordinarily show an alternate column view meant for visitors here
            </>
        );
    } else {
        return (
            <div className={"columns-panel"}>
                <Button type={"button"} variant={"primary"} onClick={testClick}>
                    Test Modal
                </Button>
                <Button type={"button"} onClick={testToast}>
                    Test Toast
                </Button>
                <ul>
                    {artistLinesTemp}
                </ul>
            </div>
        );
    }

}

export default memo(ColumnsPanel);
