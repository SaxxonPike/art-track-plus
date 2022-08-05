import React, {memo} from "react";
import "./columns-panel.scss";
import {AppActions} from "../../../app-actions";
import ColumnsColumn from "./columns-column";
import {format} from 'date-fns';
import Artist from "../../../models/artist";
import {Row} from "react-bootstrap";
import LotteryIcon from "../../icons/lottery-icon";
import StandbyIcon from "../../icons/standby-icon";
import SignInIcon from "../../icons/sign-in-icon";

interface Props {
    actions: AppActions
    partial: boolean
}

function ColumnsPanel({actions, partial}: Props) {
    const artists = actions.getArtists();
    const columns = [];

    function nameSortFn(a: Artist, b: Artist) {
        const a0 = a.name?.toLowerCase();
        const b0 = b.name?.toLowerCase();
        return a0 < b0 ? -1 : a0 > b0 ? 1 : 0;
    }

    function getAllArtists() {
        return artists
            .filter(a => !!a.name)
            .sort(nameSortFn);
    }

    function getLotteryArtists(isPartial: boolean) {
        if (isPartial) {
            return artists
                .filter(a => !!a.name && !!a.lotteryOrder)
                .sort(nameSortFn);
        } else {
            return artists
                .filter(a => !!a.name && !!a.lotteryOrder)
                .sort((a, b) => a.lotteryOrder - b.lotteryOrder);
        }
    }

    function getStandbyArtists() {
        return artists
            .filter(a => !!a.name && !!a.standbyOrder)
            .sort((a, b) => a.standbyOrder - b.standbyOrder);
    }

    function getSignedInArtists() {
        return artists
            .filter(a => !!a.tableNumber)
            .sort(nameSortFn);
    }

    function getCheckedOutArtists() {
        // Bit of a hack, but at least day names are
        // often unique enough that this won't matter.
        const today = format(new Date(), "eeee").toLowerCase();
        return artists
            .filter(a => !!a.seatedDays &&
                !a.tableNumber &&
                a.seatedDays.toLowerCase().includes(today))
            .sort(nameSortFn);
    }

    function getArtistIcons(artist: Artist) {
        const result = [];
        if (artist.lotteryOrder) {
            result.push(<LotteryIcon key={"lottery"}/>);
        }
        if (artist.standbyOrder) {
            result.push(<StandbyIcon key={"standby"}/>);
        }
        if (artist.tableNumber) {
            result.push(<SignInIcon key={"signin"}/>);
            return [
                getArtistTable(artist),
                " ",
                <span key={"icons"} className={"column-icons"}>{result}</span>
            ];
        }
        return <span key={"icons"} className={"column-icons"}>{result}</span>;
    }

    function getArtistTable(artist: Artist) {
        if (!artist.tableNumber)
            return (<></>);

        return (
            <span key={"table-number"}
                  className={"column-table-number"}>
                {artist.tableNumber}
            </span>
        );
    }

    function getNoArtistIcons() {
        return [];
    }

    const getArtistIconsFn = partial ? getNoArtistIcons : getArtistIcons;

    if (!partial) {
        columns.push(
            <ColumnsColumn key={"artists"}
                           columnType={"artists"}
                           artists={getAllArtists()}
                           title={"All Artists"}
                           width={3}
                           activeLinks={!partial}
                           getArtistIcons={getArtistIconsFn}/>
        );
    }

    columns.push(
        <ColumnsColumn key={"lottery"}
                       columnType={"lottery"}
                       artists={getLotteryArtists(partial)}
                       ordered={!partial}
                       title={"Lottery"}
                       width={3}
                       activeLinks={!partial}
                       getArtistIcons={getNoArtistIcons}/>
    );

    columns.push(
        <ColumnsColumn key={"standby"}
                       columnType={"standby"}
                       artists={getStandbyArtists()}
                       ordered={true}
                       title={"Standby"}
                       width={3}
                       activeLinks={!partial}
                       getArtistIcons={getNoArtistIcons}/>
    );

    columns.push(
        <ColumnsColumn key={"seated"}
                       columnType={"seated"}
                       artists={getSignedInArtists()}
                       title={"Seated"}
                       width={3}
                       activeLinks={!partial}
                       getArtistIcons={getArtistTable}/>
    )

    if (partial) {
        columns.push(
            <ColumnsColumn key={"checked-out"}
                           columnType={"checked-out"}
                           artists={getCheckedOutArtists()}
                           title={"Checked Out"}
                           width={3}
                           activeLinks={!partial}
                           getArtistIcons={getNoArtistIcons}/>
        )
    }

    return (
        <Row className={"columns-panel"}>
            {columns}
        </Row>
    );

}

export default memo(ColumnsPanel);
