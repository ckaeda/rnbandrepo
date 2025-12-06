import { useEffect, useState } from "react";
import "../css/editor.css";
import SongTable from "../components/Editor/SongTable";
import { checkSongsEqual } from "../functions/checkSongsEqual";
import { useNavigate } from "react-router-dom";
import SongEditor from "../components/Editor/SongEditor";

function Editor() {
    const navigate = useNavigate();
    const [showEditor, setShowEditor] = useState(false);
    const [activeSong, setActiveSong] = useState(null);

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

    const handleActiveSong = (song) => {
        setShowEditor(song !== null)
        setActiveSong(song);
    }

    useEffect(() => {
        if (!localStorage.getItem("singers") && JSON.parse(localStorage.getItem("singers"))?.length !== 7) {
            fetchAllSingers();
        }
    }, []);

    return showEditor
        ?
        <SongEditor
            song={activeSong}
            handleActiveSong={handleActiveSong}
        />
        :
        (
            <div className="editor-container">
                <div className="buttons-container">
                    <div className="editor-button back" onClick={() => navigate('/')}>
                        Back
                    </div>
                    <div className="editor-button add">
                        Add Song
                    </div>
                    <div className="editor-button save" onClick={() => handleSave()}>
                        Save
                    </div>
                </div>

                <SongTable
                    songs={swc_songs}
                    title="Sunday Worship Celebration"
                    handleActiveSong={handleActiveSong}
                    lineup="swc"
                    updateSongs={setSongs}
                />

                <SongTable
                    songs={tnl_songs}
                    title="Thursday Night Live"
                    handleActiveSong={handleActiveSong}
                    lineup="tnl"
                    updateSongs={setSongs}
                />

                <SongTable
                    songs={event_songs}
                    title={event_title}
                    handleActiveSong={handleActiveSong}
                    lineup="event"
                    titleEditable={true}
                    setEventTitle={setEventTitle}
                    updateSongs={setSongs}
                />
                <SongTable
                    songs={active_songs}
                    title="Active Songs"
                    handleActiveSong={handleActiveSong}
                    lineup={false}
                    addSongToLineup={addSongToLineup}
                />
                <SongTable
                    songs={songs.filter(s => !s.swc && !s.tnl && !s.event && !s.active)}
                    title="All Songs"
                    handleActiveSong={handleActiveSong}
                    lineup={false}
                    addSongToLineup={addSongToLineup}
                />
            </div>
        );
}

export default Editor;
