import { Chord } from "chordsheetjs";

export function convertToNumeral(unserializedSong, origKey) {
    if (!unserializedSong.lines) return unserializedSong;

    for (let i = 0; i < unserializedSong.lines.length; i++) {
        const line = unserializedSong.lines[i];
        if (!line.items) continue;

        for (let j = 0; j < line.items.length; j++) {
            const item = line.items[j];
            if (!item.chords || item.chords.trim() == "") continue;

            console.log(`Chords ${item.chords} Line ${i} Item ${j}`);
            item.chords = Chord.parse(item.chords)
                .toNumeralString(origKey)
                .replace(/([ivx]+)m/g, '$1') // Remove 'm' after lowercase Roman numerals except when followed by digits
                .replace('#vi', 'vi') // Replace '#vi' with 'vi'
                .replace('#iii', 'iii') // Replace '#vi' with 'vi'
                .replace('#VI', 'bVII') // Replace '#VI' with 'bVII'
                ;
        }
    }
}