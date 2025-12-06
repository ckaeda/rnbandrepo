import { useEffect, useState } from "react";
import "../../css/songtable.css";

function SongTable({ songs, title, handleActiveSong, handleEditSong, lineup = null, titleEditable = false, setEventTitle = null, addSongToLineup = null }) {
    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sortedSongs = [...filteredSongs].sort((a, b) => a[lineup] - b[lineup]);

    const handleSearch = (value) => {
        setFilteredSongs(songs.filter(song => song.title.toLowerCase().includes(value.toLowerCase()) || song.artist.toLowerCase().includes(value.toLowerCase())));
    }

    const handleSwitchOrder = (song, index) => {
        if (!lineup) return;

        const targetIndex = song[lineup] + index;
        if (targetIndex < 0 || targetIndex > songs.length) return;

        const songToSwap = songs.find(s => s[lineup] === targetIndex)
        if (songToSwap === undefined) return;

        const tmp = song[lineup];
        song[lineup] = targetIndex;
        songToSwap[lineup] = tmp;

        handleEditSong(song);
        handleEditSong(songToSwap);
    };


    const handleRemoveSong = (song) => {
        const removedOrder = song[lineup];
        song[lineup] = 0;
        song[`${lineup}_singer`] = ""
        handleEditSong(song);

        const toEdit = songs.filter(s => s[lineup] > removedOrder);
        if (toEdit.length === 0) return;
        toEdit.forEach(s => {
            const index = s[lineup]
            s[lineup] = index - 1
            handleEditSong(s);
        });
    };

    useEffect(() => {
        setFilteredSongs(songs);
    }, [songs]);

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
                        return (
                            <tr key={song.id}>
                                <td className="title-link" onClick={() => handleActiveSong(song)}>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>
                                    <select
                                        className="key-select"
                                        value={song[`${lineup}_singer`] || ""}
                                        onChange={(e) => {
                                            const newSinger = e.target.value || "";
                                            const updated = { ...song, [`${lineup}_singer`]: newSinger };

                                            handleEditSong(updated);
                                        }}
                                    >
                                        <option key={"none"} value={""}>—</option>
                                        {(song.defaults ? Object.keys(song.defaults).filter(k => k !== 'Orig') : []).map(name => (
                                            <option key={name} value={name}>{`${name} - ${song.defaults[name]}`}</option>
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
                                return (
                                    <tr key={song.id}>
                                        <td className="title-link" onClick={() => handleActiveSong(song)}>{song.title}</td>
                                        <td>{song.artist}</td>
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