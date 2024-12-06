import React from "react";
import {useParams} from "react-router-dom";
import ArtistPage from "./artist-page";

export default function ArtistEditPage(props) {
    const params = useParams();
    return (
        <ArtistPage {...props} artistId={Number(params.artistId)} />
    );
}