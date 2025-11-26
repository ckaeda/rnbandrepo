import { Chord } from "chordsheetjs";

export function convertToNumeral(unserializedSong, origKey) {
    if (!unserializedSong.lines) return unserializedSong;

    for (let i = 0; i < unserializedSong.lines.length; i++) {
        const line = unserializedSong.lines[i];
        if (!line.items) continue;

        for (let j = 0; j < line.items.length; j++) {
            const item = line.items[j];
            if (!item.chords || item.chords.trim() == "") continue;

            // console.log(`Original: ${item.chords}`);
            item.chords = Chord.parse(item.chords)
                .toNumeral(origKey)
                .toString()
                .replace(/([ivx]+)m/g, '$1')
                .replace('#vi', 'vi')
                .replace('bvii', 'vi')
                .replace('#iii', 'iii')
                .replace('#VI', 'bVII')
                ;
            // console.log(`Numeral: ${item.chords.toString()}`);
        }
    }
}