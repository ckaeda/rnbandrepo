

import { useState } from 'react';

function SongList({ type, title, songArray, toggleLoadSong }) {
    const [isHidden, setIsHidden] = useState(false);

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
                        {songArray.map((song) => {
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
                                    {`${song.title} - ${song.artist} (${singer})`}
                                </li>
                            );
                        })}
                    </ul>
                </> : <ul className="active-list" id="activeList" title={title} style={{ display: 'none' }}></ul>
            :
            <>
                <div className="list-hr" style={{ position: 'relative', margin: '10px 0' }}>
                        <button className="toggle-btn" onClick={() => setIsHidden(!isHidden)}>
                            <img src='arrowhead.png' style={isHidden ? { transform: 'rotate(-90deg)' } : {}} />
                        </button>
                        <div style={{ borderTop: '1px solid #ccc', marginLeft: '20px' }}></div>
                    </div>
                <ul className="song-list" title={title}>
                    {songArray.map((song) => (
                        <li key={song.id} onClick={() => toggleLoadSong(song, "")} style={isHidden ? { display: 'none' } : {}}>
                            {`${song.title} - ${song.artist}`}
                        </li>
                    ))}
                </ul>
            </>
    );
}

export default SongList;