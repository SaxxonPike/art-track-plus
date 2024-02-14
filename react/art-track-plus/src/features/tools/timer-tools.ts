// This exists because *reasons*. Mostly to do with the difference between browser "setInterval" and
// NodeJS "setInterval". Both operate the exact same way, but they are not the same and can't be used interchangeably.
// We prioritize browser's timer over NodeJS as this code will be running client side mostly.

function wrappedClearInterval(...args) {
    if (window) {
        return window.clearInterval(...args);
    } else {
        return clearInterval(...args);
    }
}

function wrappedSetInterval(handler: TimerHandler, timeout?: number, ...args) {
    if (window) {
        return window.setInterval(handler, timeout, ...args);
    } else {
        return setInterval(handler, timeout, ...args);
    }
}

const TimerTools = {
    setInterval: wrappedSetInterval,
    clearInterval: wrappedClearInterval
};

export default TimerTools;
