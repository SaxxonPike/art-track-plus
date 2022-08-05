import {format} from "date-fns";

function addDay(existingDays: string, newDay: string) {
    if (!newDay) {
        return existingDays;
    }

    if (!existingDays) {
        return newDay;
    }

    const newDayLc = newDay.toLowerCase();

    const days = existingDays
        .toLowerCase()
        .split(",")
        .map(s => s.trim());

    if (days.some(s => s === newDayLc)) {
        return existingDays;
    }

    days.push(newDay);
    return days.join(",");
}

function addToday(existingDays: string) {
    return addDay(existingDays, format(new Date(), "eeee"));
}

function hasToday(existingDays: string) {
    if (!existingDays) {
        return false;
    }

    const todayLc = format(new Date(), "eeee").toLowerCase();

    return existingDays
        .toLowerCase()
        .split(",")
        .map(s => s.trim())
        .some(s => s === todayLc);
}

const ArtistTools = {
    addDay: addDay,
    addToday: addToday,
    hasToday: hasToday
};

export default ArtistTools;