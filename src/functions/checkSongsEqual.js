export function checkSongsEqual(songA, songB) {
    const keysA = Object.keys(songA);
    const keysB = Object.keys(songB);
    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (songA[key] !== songB[key]) return false;
    }
    return true;
}