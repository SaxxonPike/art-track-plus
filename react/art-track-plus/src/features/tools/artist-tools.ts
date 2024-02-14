import {format} from "date-fns";

function getDay(date: Date) {
    return format(date, "eeee");
}

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
    return addDay(existingDays, getDay(new Date()));
}

function hasDay(existingDays: string, day: string) {
    if (!existingDays) {
        return false;
    }

    const dayLc = day.toLowerCase();

    return existingDays
        .toLowerCase()
        .split(",")
        .map(s => s.trim())
        .some(s => s === dayLc);
}

function hasToday(existingDays: string) {
    return hasDay(existingDays, getDay(new Date()));
}

function countDays(days: string) {
    if (!days) {
        return 0;
    }

    return days.split(",").length;
}

const ArtistTools = {
    addDay: addDay,
    addToday: addToday,
    hasDay: hasDay,
    hasToday: hasToday,
    countDays: countDays,
    getDay: getDay
};

export default ArtistTools;