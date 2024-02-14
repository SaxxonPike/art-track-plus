import React from "react";
import UserNav from "../navs/user-nav";
import {Container} from "react-bootstrap";
import ArtistPanel from "../panels/artist/artist-panel";
import tabs from "./tabs";

export default function ArtistPage(props) {

    return (
        <div className={"artist-page"}>
            <UserNav activeTab={tabs.artist} {...props}/>
            <Container>
                <ArtistPanel {...props}/>
            </Container>
        </div>
    );
}