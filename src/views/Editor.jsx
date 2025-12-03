import { useState } from "react";
import "../css/editor.css";
import SongTable from "../components/Editor/SongTable";
import { checkSongsEqual } from "../functions/checkSongsEqual";

function Editor() {
    const stored = JSON.parse(localStorage.getItem("songs"));

    const [songs, setSongs] = useState(
        stored.songs.sort((a, b) => a.title.localeCompare(b.title))
    );
    const [event_title, setEventTitle] = useState(stored.info.title);

    const swc_songs = songs.filter(s => s.swc).sort((a, b) => a.swc - b.swc);
    const tnl_songs = songs.filter(s => s.tnl).sort((a, b) => a.tnl - b.tnl);
    const event_songs = songs.filter(s => s.event).sort((a, b) => a.event - b.event);
    const active_songs = songs.filter(s => s.active).sort((a, b) => a.title.localeCompare(b.title));

    const addSongToLineup = (song, lineup) => {
        const updated = songs.map(s => ({ ...s }));

        const songToAdd = updated.find(s => s.id === song.id);
        if (!songToAdd) return;

        songToAdd[lineup] = updated.filter(s => s[lineup]).length + 1;

        setSongs(updated);
    };

    const handleSave = () => {
        const temp = JSON.parse(sessionStorage.getItem("temp"));

        const toSave = temp.map(s => {
            const origSong = songs.find(os => os.id === s.id) || {};

            if (!checkSongsEqual(origSong, s)) return s;
        })

        console.log(toSave);
    }

    return (
        <div className="editor-container">
            <div className="save-button" onClick={() => handleSave()}>
                Save
            </div>

            <SongTable
                songs={swc_songs}
                title="Sunday Worship Celebration"
                lineup="swc"
                updateSongs={setSongs}
            />

            <SongTable
                songs={tnl_songs}
                title="Thursday Night Live"
                lineup="tnl"
                updateSongs={setSongs}
            />

            <SongTable
                songs={event_songs}
                title={event_title}
                lineup="event"
                titleEditable={true}
                setEventTitle={setEventTitle}
                updateSongs={setSongs}
            />
            <SongTable
                songs={active_songs}
                title="Active Songs"
                lineup={false}
                addSongToLineup={addSongToLineup}
            />
            <SongTable
                songs={songs.filter(s => !s.swc && !s.tnl && !s.event && !s.active)}
                title="All Songs"
                lineup={false}
                addSongToLineup={addSongToLineup}
            />
        </div>
    );
}

export default Editor;
