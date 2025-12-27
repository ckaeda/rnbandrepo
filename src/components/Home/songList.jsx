

import { useState } from 'react';

function SongList({ type, title, songArray, toggleLoadSong, searchTerm }) {
    const [isHidden, setIsHidden] = useState(type === "active" ? false : true);
    const filteredSongs = songArray.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        type === "active"
            ? title != ""
                ? <>
                    <div className="list-hr" style={{ position: 'relative', margin: '10px 0' }}>
                        <button className="toggle-btn" onClick={() => setIsHidden(!isHidden)}>
                            <img src='arrowhead.png' style={isHidden ? { transform: 'rotate(-90deg)' } : {}} />
                        </button>
                        <div style={{ borderTop: '1px solid #ccc', marginLeft: '20px' }}></div>
                    </div>
                    <ul className="active-list" id="activeList" title={title}>
                        {filteredSongs.map((song) => {
                            const singer =
                                title.includes("SWC")
                                    ? song.swc_singer
                                    : title.includes("TNL")
                                        ? song.tnl_singer
                                        : song.event_singer;

                            return (
                                <li
                                    key={song.id}
                                    onClick={() => toggleLoadSong(song, singer)}
                                    style={isHidden ? { display: 'none' } : {}}
                                >
                                    {`${song.title}` + (song.artist !== "" ? ` - ${song.artist}` : '') + (singer ? ` (${singer})` : '')}
                                </li>
                            );
                        })}
                    </ul>
                </> : <ul className="active-list" id="activeList" title={title} style={{ display: 'none' }}></ul>
            :
            <>
                <div className="list-hr" style={{ position: 'relative', margin: '10px 0' }}>
                        <button className="toggle-btn" onClick={() => setIsHidden(!isHidden)}>
                            <img src='arrowhead.png' style={isHidden && searchTerm.length === 0 ? { transform: 'rotate(-90deg)' } : {}} />
                        </button>
                        <div style={{ borderTop: '1px solid #ccc', marginLeft: '20px' }}></div>
                    </div>
                <ul className="song-list" title={title}>
                    {filteredSongs.map((song) => (
                        <li key={song.id} onClick={() => toggleLoadSong(song, "")} style={isHidden && searchTerm.length === 0 ? { display: 'none' } : {}}>
                            {`${song.title} - ${song.artist}`}
                        </li>
                    ))}
                </ul>
            </>
    );
}

export default SongList;