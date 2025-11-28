import ChordSheetJS, { Chord } from 'chordsheetjs';
import { convertToNumeral } from './convertToNumeral';


export function parseSong(metadata, lyrics, key, keyDiff, numeralMode = false) {
    const origKey = metadata.defaults.Orig;

    const parser = new ChordSheetJS.UltimateGuitarParser();
    const unserializedSong = parser.parse(`${lyrics}`).setKey(origKey).changeKey(key).transpose(keyDiff);

    if (numeralMode) {
        convertToNumeral(unserializedSong, Chord.parse(key).transpose(keyDiff).toString());
    }

    for (let i = 0; i < unserializedSong.lines.length; i++) {
        const line = unserializedSong.lines[i];
        if (!line.items) continue;

        for (let j = 0; j < line.items.length; j++) {
            const item = line.items[j];
            if (!item.chords || item.chords.trim() == "") continue;

            if (["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb"].includes(Chord.parse(key).transpose(keyDiff).toString())) {
                item.chords = Chord.parse(item.chords).useModifier('b').normalize();
            } else {
                item.chords = Chord.parse(item.chords).useModifier('#').normalize();
            }
        }
    }

    const formatter = new ChordSheetJS.HtmlTableFormatter();
    var disp = formatter.format(unserializedSong);
        
    disp = disp.replace(/<td class="comment">(.*?)<\/td>/g, '<h3 class="label">$1</h3>');

    return disp;
}