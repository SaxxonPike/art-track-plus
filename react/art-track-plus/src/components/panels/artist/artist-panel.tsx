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

export interface Props {
    actions: AppActions
    artistId: number | null
    rapidEntry: boolean
}

interface State {
    artist: Artist
    loaded: boolean
}

export default function ArtistPanel({actions, artistId, rapidEntry}: Props) {
    console.log("render artist panel", artistId);

    // If an artist ID is requested, load it before showing
    // anything else. Otherwise, we can show the form immediately.
    const initialState = artistId ?
        {
            artist: null,
            loaded: false
        } : {
            artist: getDefaultArtist(),
            loaded: true
        };

    const [state, setState] = useState<State>(initialState);

    // This is where we load existing artist data.
    if (!state.loaded && artistId) {
        const artist = actions.getArtist(artistId);
        if (artist) {
            setState({
                artist: artist,
                loaded: true
            })
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
        if (!artistId)
            return;

        const record = actions.deleteArtist(artistId);
        if (!record) {
            actions.openToast({
                header: "Artist failed to delete.",
                body: JSON.stringify(record)
            })
        }

        navigate(paths.columns);
    }

    function onChange(artist: Artist) {
        setState({
            ...state,
            artist: artist
        });
        console.log("state", state);
    }

    function onRapidReset() {
        setState({
            ...state,
            artist: getDefaultArtist()
        });
    }

    const title = (artistId ? " Edit " : " Add ") + names.vendorCap;
    const titleIcon = (artistId ? <UserIcon/> : <UserAddIcon/>);
    const titleId = (artistId ? <span className={"artist-id text-muted"}>{" (" + artistId + ")"}</span> : <></>)

    // Artist actions available only for existing records.
    const artistActions = artistId ? (
        <Row>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"sign-out"}>
                        <SignOutIcon/>
                        {" Sign Out"}
                    </Button>
                </BlockButtonGroup>
            </Col>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"standby"}>
                        <StandbyIcon/>
                        {" Standby"}
                    </Button>
                </BlockButtonGroup>
            </Col>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"sign-in"}>
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
                          onSave={onSave}/>
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
