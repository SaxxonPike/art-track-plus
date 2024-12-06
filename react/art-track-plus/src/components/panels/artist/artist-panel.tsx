import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import paths from "../../../paths";
import names from "../../../names";
import {AppActions} from "../../../app-actions";
import Artist from "../../../models/artist";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import SignOutIcon from "../../icons/sign-out-icon";
import SignInIcon from "../../icons/sign-in-icon";
import StandbyIcon from "../../icons/standby-icon";
import "./artist-panel.scss";
import UserIcon from "../../icons/user-icon";
import UserAddIcon from "../../icons/user-add-icon";
import ArtistPanelForm from "./artist-panel-form";
import PromptModal from "../../modals/prompt-modal";
import ChoiceModal from "../../modals/choice-modal";

export interface Props {
    actions: AppActions
    artistId: number | null
    rapidEntry: boolean
}

interface State {
    artist: Artist
    loaded: boolean
    artistName: string
}

export default function ArtistPanel({actions, artistId, rapidEntry}: Props) {
    // If an artist ID is requested, load it before showing
    // anything else. Otherwise, we can show the form immediately.
    const initialState = artistId ?
        {
            artist: null,
            loaded: false,
            artistName: null
        } : {
            artist: getDefaultArtist(),
            loaded: true,
            artistName: null
        };

    const [state, setState] = useState<State>(initialState);

    // This is where we load existing artist data.
    if (!state.loaded && artistId) {
        const artist = actions.getArtist(artistId);
        if (artist) {
            setState({
                artist: artist,
                loaded: true,
                artistName: artist?.name
            });
        }
    }

    const navigate = useNavigate();

    function getDefaultArtist(): Artist {
        return {
            lotteryEligible: true
        };
    }

    function onCancel() {
        navigate(paths.columns);
    }

    function onSave() {
        if (!artistId) {
            const record = actions.createArtist(state.artist);
            if (!record) {
                actions.openToast({
                    header: "Artist failed to create.",
                    body: JSON.stringify(record)
                })
            }
        } else {
            const record = actions.updateArtist(state.artist);
            if (!record) {
                actions.openToast({
                    header: "Artist failed to update.",
                    body: JSON.stringify(record)
                })
            }
        }

        if (rapidEntry) {
            onRapidReset();
        } else {
            navigate(paths.columns);
        }
    }

    function onDelete() {
        function doDelete() {
            actions.deleteArtist(artistId)
                .then(() => navigate(paths.columns));
        }

        if (!artistId)
            return;

        ChoiceModal.showChoice({
            actions: actions,
            title: `Delete ${state.artist.name}`,
            message: `Really delete this ${names.vendor}?`,
            hideNo: true,
            onYes: doDelete
        })
    }

    function onChange(artist: Artist) {
        setState({
            ...state,
            artist: artist
        });
    }

    function onRapidReset() {
        setState({
            ...state,
            artist: getDefaultArtist()
        });
    }

    function onSignOut() {
        function doSignOut(nextDayLotto: boolean) {
            actions.signOutArtist(artistId, nextDayLotto)
                .then(() => navigate(paths.columns));
        }

        ChoiceModal.showChoice({
            actions: actions,
            title: `Signing Out ${state.artist.name}`,
            message: `Would this ${names.vendor} like to be included in tomorrow's lottery?`,
            onYes: () => doSignOut(true),
            onNo: () => doSignOut(false)
        })
    }

    function onSignIn() {
        function doSignIn(tableNumber: string) {
            actions.signInArtist(artistId, tableNumber)
                .then(() => navigate(paths.columns));
        }

        PromptModal.showPrompt({
            actions: actions,
            title: `Sign In for ${state.artist.name}`,
            message: "Enter a table number.",
            onOk: doSignIn,
            required: true
        })
    }

    function onStandby() {
        actions.standbyArtist(artistId)
            .then(() => navigate(paths.columns));
    }

    const titleName = state.artistName;
    const title = `${rapidEntry ? " Rapid" : ""}` +
        `${artistId ? " Edit " : " Add "}` +
        `${titleName ? titleName : names.vendorCap}`;
    const titleIcon = (artistId ? <UserIcon/> : <UserAddIcon/>);
    const titleId = (artistId ? <span className={"artist-id text-muted"}>{` (${artistId})`}</span> : <></>)

    // Artist actions available only for existing records.
    const artistActions = artistId ? (
        <Row>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"sign-out"} onClick={onSignOut}>
                        <SignOutIcon/>
                        {" Sign Out"}
                    </Button>
                </BlockButtonGroup>
            </Col>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"standby"} onClick={onStandby}>
                        <StandbyIcon/>
                        {" Standby"}
                    </Button>
                </BlockButtonGroup>
            </Col>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"sign-in"} onClick={onSignIn}>
                        <SignInIcon/>
                        {" Sign In"}
                    </Button>
                </BlockButtonGroup>
            </Col>
        </Row>
    ) : (<></>);

    const form = state.loaded ?
        (<ArtistPanelForm artist={state.artist}
                          onChange={onChange}
                          onDelete={onDelete}
                          onCancel={onCancel}
                          onSave={onSave}
                          rapidEntry={rapidEntry}/>
        ) : (<p>loading...</p>)

    return (
        <div className={"artist-panel my-3"}>
            <h1 className={"text-center"}>{titleIcon}{title}{titleId}</h1>
            <hr/>
            {artistActions}
            {form}
        </div>
    )
}
