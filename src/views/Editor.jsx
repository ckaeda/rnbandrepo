import { useState } from "react";
import SongTable from "../components/Editor/SongTable";

function Editor() {
    const songs = JSON.parse(localStorage.getItem("songs")).songs.sort((a, b) => a.title.localeCompare(b.title));
    const [event_title, setEventTitle] = useState(JSON.parse(localStorage.getItem("songs")).info.title);

    const swc_songs = songs.filter(song => song.swc).sort((a, b) => a.swc - b.swc);
    const tnl_songs = songs.filter(song => song.tnl).sort((a, b) => a.tnl - b.tnl);
    const event_songs = songs.filter(song => song.event).sort((a, b) => a.event - b.event);
    const active_songs = songs.filter(song => song.active).sort((a, b) => a.title.localeCompare(b.title));

    return (
        <>
            <SongTable songs={swc_songs} title="Sunday Worship Celebration" lineup="swc" />
            <SongTable songs={tnl_songs} title="Thursday Night Live" lineup="tnl" />
            <SongTable songs={event_songs} title={event_title} lineup="event" titleEditable={true} setEventTitle={setEventTitle} />
            <SongTable songs={active_songs} title="Active Songs" lineup={false} />
            <SongTable songs={songs} title="All Songs" lineup={false} />
        </>
    )
}

export default Editor;