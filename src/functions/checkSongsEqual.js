export function checkSongsEqual(songA, songB) {
    const keysA = Object.keys(songA);
    const keysB = Object.keys(songB);
    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (typeof (songA[key]) === "object") { if (!checkSongsEqual(songA[key], songB[key])) return false; }
        else if (songA[key] !== songB[key]) return false;
    }
    return true;
}