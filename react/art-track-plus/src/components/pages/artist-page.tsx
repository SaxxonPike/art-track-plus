import {AppActions} from "../../app-actions";
import Artist from "../../models/artist";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import paths from "../../paths";
import names from "../../names";
import React from "react";
import UserNav from "../navs/user-nav";
import {Container} from "react-bootstrap";
import ArtistPanel from "../panels/artist/artist-panel";

export default function ArtistPage(props) {

    return (
        <div className={"artist-page"}>
            <UserNav {...props}/>
            <Container>
                <ArtistPanel {...props}/>
            </Container>
        </div>
    );
}