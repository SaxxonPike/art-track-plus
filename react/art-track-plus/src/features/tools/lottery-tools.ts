import ArrayTools from "./array-tools";
import ArtistTools from "./artist-tools";
import Artist from "../../models/artist";

async function runLottery(artists: Artist[], seats: number, day: string) {
    if (!artists) {
        return;
    }

    // Clear lottery for all not in it.
    await this.updateAllArtists({
        lotteryOrder: null,
        standbyOrder: null
    });

    let lotteryOrder = 1;
    let standbyOrder = 1;

    // All artists that are guaranteed in the lottery.
    const guaranteedArtists = ArrayTools.shuffle(artists
        .filter(a => !!a.lotteryGuaranteed), 10);

    // All remaining artists that are eligible for the drawing.
    const eligibleArtists = ArrayTools.shuffle(artists
        .filter(a => !!a.lotteryEligible && !a.lotteryGuaranteed), 10);

    // Populate all guaranteed artists.
    guaranteedArtists.forEach(a => {
        this.updateArtist({
            id: a.id,
            lotteryOrder: lotteryOrder++
        });
    });

    // Populate all eligible artists that fit.
    eligibleArtists.forEach(a => {
        if (lotteryOrder <= seats) {
            this.updateArtist({
                id: a.id,
                lotteryOrder: lotteryOrder++
            });
        } else {
            // Once we hit the cap, start the standby list.
            this.updateArtist({
                id: a.id,
                standbyOrder: standbyOrder++,
                standbyDays: ArtistTools.addDay(a.standbyDays, day)
            });
        }
    });
}

export const LotteryTools = {
    runLottery: runLottery
}

export default LotteryTools;