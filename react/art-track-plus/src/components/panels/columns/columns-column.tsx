import React, {memo} from "react";
import "./columns-column.scss";
import Artist from "../../../models/artist";
import {generatePath, Link} from "react-router-dom";
import paths from "../../../paths";
import {Col} from "react-bootstrap";
import SimpleBar from "simplebar-react";

export interface Props {
    columnType: string
    artists: Artist[]
    ordered?: boolean
    title: React.ReactNode
    getArtistIcons?: (artist: Artist) => React.ReactNode
    width: number
    activeLinks?: boolean
    cols?: number
}

function ColumnsColumn({
                           columnType,
                           artists,
                           ordered,
                           title,
                           getArtistIcons,
                           width,
                           activeLinks,
                           cols,
                           ...props
                       }: Props) {
    function getColStyle() {
        if (cols && cols > 1) {
            return {columns: cols};
        }
        return {};
    }

    function generateContents(artist: Artist, index?: number) {
        const icons = getArtistIcons ? getArtistIcons(artist) : [];
        const num = index ? (<span className={"column-list-index"}>{index}.</span>) : null;

        if (activeLinks) {
            return (
                <Link to={generatePath(paths.editArtist, {artistId: artist.id + ""})}
                      tabIndex={0}>
                    {num}
                    {artist.name}
                    {" "}
                    {icons}
                </Link>
            );
        } else {
            return <>{artist.name}{icons}</>;
        }
    }

    function generateItem(artist: Artist) {
        return (
            <li key={"artist-id-" + artist.id}>
                {generateContents(artist)}
            </li>
        );
    }

    function generateOrderedItem(artist: Artist, index: number) {
        return (
            <li key={"artist-id-" + artist.id}>
                {generateContents(artist, index + 1)}
            </li>
        );
    }

    function generateOrdered(artists: Artist[]) {
        return (
            <ol style={{...getColStyle()}}>
                {artists.map(generateOrderedItem)}
            </ol>
        );
    }

    function generateUnordered(artists: Artist[]) {
        return (
            <ul style={{...getColStyle()}}>
                {artists.map(generateItem)}
            </ul>
        );
    }

    const items = ordered ? generateOrdered(artists) : generateUnordered(artists);

    return (
        <Col xs={width}
             className={"columns-column column-" + columnType} {...props}>
            <div className={"column-title"}>
                {title} ({artists.length})
            </div>
            <SimpleBar style={{maxHeight: "calc(100% - 30px)"}}>
                {items}
            </SimpleBar>
        </Col>
    )
}

export default memo(ColumnsColumn);