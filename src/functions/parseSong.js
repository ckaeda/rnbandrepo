import ChordSheetJS, { Chord } from 'chordsheetjs';
import { convertToNumeral } from './convertToNumeral';

export function parseSong(metadata, lyrics, key, keyDiff, numeralMode = false, hideChords = false) {
    const origKey = metadata.defaults.Orig;

    const parser = new ChordSheetJS.UltimateGuitarParser();
    const unserializedSong = parser.parse(`${lyrics}`).setKey(origKey).changeKey(key).transpose(keyDiff);

    if (numeralMode) {
        console.log(unserializedSong);
        convertToNumeral(unserializedSong, Chord.parse(key).transpose(keyDiff).toString());
    }

    const formatter = new ChordSheetJS.HtmlTableFormatter();
    var disp = formatter.format(unserializedSong);

    const toHeader = [
        'Intro',
        'Pre-Chorus',
        'Pre-Chorus 1',
        'Pre-Chorus 2',
        'Chorus 1',
        'Chorus 2',
        'Chorus 3',
        'Bridge',
        'Bridge 1',
        'Bridge 2',
        'Bridge 3',
        'Bridge 4',
        'Outro',
        'Instrumental',
        'Instrumental 1',
        'Instrumental 2',
        'Post-Chorus',
        'Post-Chorus 2',
        "Refrain",
        'Interlude',
        'Interlude 2',
        'Vamp',
        'Vamp 2',
        'Vamp 3',
        'Tag',
        'Tag 1',
        'Tag 2',
        'Breakdown',
        'Turnaround',
        'Hook',
        'Coda',
        'Ending'
    ];

    for (let str in toHeader) {
        disp = disp.replaceAll('<td class="comment">' + toHeader[str] + '</td>', '<h3 class="label">' + toHeader[str] + '</h3>');
    }

    return disp;
}