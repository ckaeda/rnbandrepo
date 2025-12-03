import { useEffect, useState } from "react";
import "../../css/songtable.css";
import { useNavigate } from "react-router-dom";

function SongTable({ songs, title, lineup = null, titleEditable = false, setEventTitle = null, addSongToLineup = null, updateSongs = null }) {
    const navigate = useNavigate();

    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sortedSongs = [...filteredSongs].sort((a, b) => a[lineup] - b[lineup]);

    const handleSearch = (value) => {
        setFilteredSongs(songs.filter(song => song.title.toLowerCase().includes(value.toLowerCase()) || song.artist.toLowerCase().includes(value.toLowerCase())));
    }

    const handleSwitchOrder = (song, index) => {
        if (!lineup) return;

        const sorted = [...filteredSongs].sort((a, b) => a[lineup] - b[lineup]).map(s => ({ ...s }));

        const currentIndex = sorted.findIndex(s => s.id === song.id);
        if (currentIndex === -1) return;

        const targetIndex = currentIndex + index;
        if (targetIndex < 0 || targetIndex >= sorted.length) return;

        const tmp = sorted[currentIndex];
        sorted[currentIndex] = sorted[targetIndex];
        sorted[targetIndex] = tmp;

        const newOrderForId = {};
        sorted.forEach((s, i) => {
            newOrderForId[s.id] = i + 1;
        });

        const updated = filteredSongs.map(s => ({ ...s, [lineup]: newOrderForId[s.id] ?? s[lineup] }));

        setFilteredSongs(updated);
    };


    const handleRemoveSong = (song) => {
        const removedOrder = song[lineup];

        const remaining = filteredSongs
            .filter(s => s.id !== song.id)
            .map(s => ({ ...s }));

        const sortedRemaining = [...remaining].sort((a, b) => a[lineup] - b[lineup]);
        sortedRemaining.forEach((s, index) => {
            s[lineup] = index + 1;
        });

        setFilteredSongs(sortedRemaining);

        if (updateSongs) {
            updateSongs(prev =>
                prev.map(s =>
                    s.id === song.id
                        ? { ...s, [lineup]: null }
                        : s[lineup] > removedOrder
                            ? { ...s, [lineup]: s[lineup] - 1 }
                            : s
                )
            );
        }
    };

    useEffect(() => {
        setFilteredSongs(songs);
    }, [songs]);

    return lineup ? (
        <div className="lineup-table-container">
            <h2 className="event-title">{titleEditable ? <input type="search" value={title} onChange={(e) => setEventTitle(e.target.value)} /> : title}</h2>
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
                    {sortedSongs.map(song => (
                        <tr key={song.id}>
                            <td className="title-link" onClick={() => navigate(`/editor/${song._id}`)}>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>
                                <select
                                    className="key-select"
                                    value={song[`${lineup}_singer`] || ""}
                                    onChange={(e) => {
                                        const newSinger = e.target.value || null;
                                        if (updateSongs) {
                                            updateSongs(prev => prev.map(s => s.id === song.id ? { ...s, [`${lineup}_singer`]: newSinger } : s));
                                        } else {
                                            setFilteredSongs(prev => prev.map(s => s.id === song.id ? { ...s, [`${lineup}_singer`]: newSinger } : s));
                                        }
                                    }}
                                >
                                    {(song.defaults ? Object.keys(song.defaults).filter(k => k !== 'Orig') : []).map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <div className="actions-container">
                                    <div onClick={() => handleSwitchOrder(song, -1)}>˄</div>
                                    <div onClick={() => handleSwitchOrder(song, 1)}>˅</div>
                                    <div onClick={() => handleRemoveSong(song)}>-</div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="song-table-container">
            <div className="song-table-title-container">
                <button 
                    className="collapse-button"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? "▶" : "▼"}
                </button>
                <span className="event-title">{title}</span>
                <input id="searchBar" type="search" placeholder="Search..." onChange={(e) => { handleSearch(e.target.value) }} />
            </div>
            {!isCollapsed && (
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
                            filteredSongs.map((song) => (
                                <tr key={song.id}>
                                    <td className="title-link" onClick={() => navigate(`/editor/${song._id}`)}>{song.title}</td>
                                    <td>{song.artist}</td>
                                    <td>
                                        <div className="actions-container">
                                            <div onClick={() => addSongToLineup(song, "swc")}>Add to SWC</div>
                                            <div onClick={() => addSongToLineup(song, "tnl")}>Add to TNL</div>
                                            <div onClick={() => addSongToLineup(song, "event")}>Add to Event</div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default SongTable;