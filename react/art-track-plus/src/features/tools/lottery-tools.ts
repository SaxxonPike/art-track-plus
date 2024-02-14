import ArrayTools from "./array-tools";
import ArtistTools from "./artist-tools";
import Artist from "../../models/artist";

// Run the lottery. Returns the new list of artist data.
async function runLottery(artists: Artist[], seats: number, day: string, prioritizeUnlucky: boolean): Promise<Artist[]> {
    if (!artists) {
        return;
    }

    // Clear lottery for all not in it. Also, unseat all artists.
    // This also makes a copy of each artist object so the originals are not modified.
    artists = artists
        .map(a => ({...a, lotteryOrder: null, standbyOrder: null, tableNumber: null}));

    // Initial order index.
    let lotteryOrder = 1;
    let standbyOrder = 1;

    // All artists that are guaranteed in the lottery.
    const guaranteedArtists = ArrayTools.shuffle(artists
        .filter(a => a.lotteryEligible && a.lotteryGuaranteed), 10);

    // All remaining artists that are eligible for the drawing.
    const eligibleArtists = ArrayTools.shuffle(artists
        .filter(a => a.lotteryEligible && !a.lotteryGuaranteed), 10);

    // Adds the artist to the next lottery slot.
    function addArtistToLottery(a: Artist) {
        a.lotteryOrder = lotteryOrder++;
        a.lotteryDays = ArtistTools.addDay(a.lotteryDays, day);
    }

    // Adds the artist to the next standby slot.
    function addArtistToStandby(a: Artist) {
        a.standbyOrder = standbyOrder++;
        a.standbyDays = ArtistTools.addDay(a.standbyDays, day);
    }

    // Adds the artist to the next slot based on number of seats.
    function addArtist(a: Artist) {
        if (lotteryOrder <= seats) {
            addArtistToLottery(a);
        } else {
            // Once we hit the cap, start the standby list.
            addArtistToStandby(a);
        }
    }

    // Populate all guaranteed artists.
    guaranteedArtists.forEach(addArtistToLottery);

    // Populate everyone else that is eligible.
    if (prioritizeUnlucky) {
        // Luck works thusly: if you have signed up more times than you have been
        // let in, you are unlucky. Otherwise, you are lucky.
        const lucky = [];
        const unlucky = [];
        eligibleArtists.forEach(a => {
            if (ArtistTools.countDays(a.lotteryDays) > ArtistTools.countDays(a.seatedDays)) {
                unlucky.push(a);
            } else {
                lucky.push(a);
            }

        });

        unlucky.forEach(addArtist);
        lucky.forEach(addArtist);
    } else {
        // Standard random lottery behavior.
        eligibleArtists.forEach(addArtist);
    }

    return artists;
}

export const LotteryTools = {
    runLottery: runLottery
}

export default LotteryTools;