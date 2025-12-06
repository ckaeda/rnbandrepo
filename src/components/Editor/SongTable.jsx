import { useEffect, useState } from "react";
import "../../css/songtable.css";
import { useNavigate } from "react-router-dom";

function SongTable({ songs, title, handleActiveSong, lineup = null, titleEditable = false, setEventTitle = null, addSongToLineup = null, updateSongs = null }) {
    const navigate = useNavigate();

    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sortedSongs = [...filteredSongs].sort((a, b) => a[lineup] - b[lineup]);
    const [tempSongs, setTempSongs] = useState(() => JSON.parse(sessionStorage.getItem('temp')) || []);

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

    useEffect(() => {
        sessionStorage.setItem('temp', JSON.stringify(tempSongs));
    }, [tempSongs]);

    const getTempSong = (songId) => {
        try {
            if (!Array.isArray(tempSongs)) return null;
            return tempSongs.find(s => (s.id && s.id === songId) || (s._id && s._id === songId)) || null;
        } catch (e) {
            console.error('Failed to read temp for', songId, e);
        }
        return null;
    };

    return lineup ? (
        <div className="lineup-table-container">
            <h2 className="event-title">{titleEditable
                ? <>
                    <label htmlFor="titleInput">Event</label>
                    <input id="titleInput" type="text" placeholder="Enter event title..." value={title} onChange={(e) => setEventTitle(e.target.value)} />
                </>
                :
                title}
            </h2>
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
                    {sortedSongs.map(song => {
                        const display = getTempSong(song.id) || song;
                        return (
                            <tr key={song.id}>
                                <td className="title-link" onClick={() => handleActiveSong(display)}>{display.title}</td>
                                <td>{display.artist}</td>
                                <td>
                                    <select
                                        className="key-select"
                                        value={display[`${lineup}_singer`] || ""}
                                        onChange={(e) => {
                                            const newSinger = e.target.value || null;

                                            // update a copy of the display object
                                            const updated = { ...display, [`${lineup}_singer`]: newSinger };

                                            setTempSongs(prev => {
                                                const exists = prev.find(s => (s.id && (s.id === (song.id || song._id))) || (s._id && (s._id === (song.id || song._id))));
                                                if (!exists) {
                                                    return [...prev, updated];
                                                }
                                                return prev.map(s => {
                                                    const sid = s.id || s._id;
                                                    const songId = song.id || song._id;
                                                    if (sid === songId) return { ...updated };
                                                    return s;
                                                });
                                            });
                                        }}
                                    >
                                        {(display.defaults ? Object.keys(display.defaults).filter(k => k !== 'Orig') : []).map(name => (
                                            <option key={name} value={name}>{`${name} - ${display.defaults[name]}`}</option>
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
                        );
                    })}
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
                            filteredSongs.map((song) => {
                                const display = getTempSong(song.id) || song;
                                return (
                                    <tr key={song.id}>
                                        <td className="title-link" onClick={() => navigate(`/editor/${song._id}`)}>{display.title}</td>
                                        <td>{display.artist}</td>
                                        <td>
                                            <div className="actions-container">
                                                <div onClick={() => addSongToLineup(song, "swc")}>Add to SWC</div>
                                                <div onClick={() => addSongToLineup(song, "tnl")}>Add to TNL</div>
                                                <div onClick={() => addSongToLineup(song, "event")}>Add to Event</div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default SongTable;