

function SongList({ type, title, songArray, setActiveSong }) {
    return (
        type === "active"
            ? title != ""
                ? <>
                    <ul className="active-list" id="activeList" title={title}>
                        {songArray.map((song) => (
                            <li key={song.id} onClick={() => setActiveSong(song)}>
                                {`${song.title} - ${song.artist} (${
                                    title === "SWC"
                                        ? song.swc_singer
                                        : title === "TNL"
                                            ? song.tnl_singer
                                            : song.event_singer
                                })`}
                            </li>
                        ))}
                    </ul>
                </> : <ul className="active-list" id="activeList" title={title} style={{ display: 'none' }}></ul>
            :
            <>
                <ul className="song-list" title={title}>
                    {songArray.map((song) => (
                        <li key={song.id} onClick={() => setActiveSong(song)}>
                            {`${song.title} - ${song.artist}`}
                        </li>
                    ))}
                </ul>
            </>
    );
}

export default SongList;