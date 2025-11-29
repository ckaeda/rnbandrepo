import { useState } from "react";
import "../../css/songtable.css";

function SongTable({ songs, title, lineup = null, titleEditable = false, setEventTitle = null }) {
    const [filteredSongs, setFilteredSongs] = useState(songs);

    const handleSearch = (value) => {
        setFilteredSongs(songs.filter(song => song.title.toLowerCase().includes(value.toLowerCase()) || song.artist.toLowerCase().includes(value.toLowerCase())));
    }

    const handleSwitchOrder = (song, index) => {
        const updated = [...filteredSongs].map(s => ({ ...s }));

        const currentIndex = updated.findIndex(s => s.id === song.id);
        const targetIndex = currentIndex + index;

        if (targetIndex < 0 || targetIndex >= updated.length) return;

        // Swap order values
        const temp = updated[currentIndex][lineup];
        updated[currentIndex][lineup] = updated[targetIndex][lineup];
        updated[targetIndex][lineup] = temp;

        setFilteredSongs(updated);
    };

    const handleRemoveSong = (song) => {
        const removedOrder = song[lineup];

        const updated = filteredSongs
            .filter(s => s.id !== song.id)
            .map(s => { return s[lineup] > removedOrder ?  { ...s, [lineup]: s[lineup] - 1 }: s });
        
        setFilteredSongs(updated);
    };

    return lineup ? (
        <div className="lineup-table-container">
            <h2 className="event-title">{titleEditable ? <input type="search" value={title || "Event Title"} onChange={(e) => setEventTitle(e.target.value)} /> : title}</h2>
            <table className="song-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Singer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredSongs.sort((a, b) => a[lineup] - b[lineup]).map((song, index) => (
                            <tr key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.swc_singer || song.tnl_singer || song.event_singer}</td>
                                <td>
                                    <div className="actions-container">
                                        <div onClick={() => handleSwitchOrder(song, -1)}>˄</div>
                                        <div onClick={() => handleSwitchOrder(song, 1)}>˅</div>
                                        <div onClick={() => handleRemoveSong(song)}>‑</div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    ) : (
        <div className="song-table-container">
            <div className="song-table-title-container">
                <span className="event-title">{title}</span>
                <input type="search" onChange={(e) => { handleSearch(e.target.value) }} />
            </div>
            <table className="song-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredSongs.map((song, index) => (
                            <tr key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>
                                    <div className="actions-container">
                                        <div>Add to SWC</div>
                                        <div>Add to TNL</div>
                                        <div>Add to Event</div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SongTable;