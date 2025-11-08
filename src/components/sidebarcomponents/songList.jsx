

function SongList({ type, title, songArray, toggleLoadSong }) {
    return (
        type === "active"
            ? title != ""
                ? <>
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
                                >
                                    {`${song.title} - ${song.artist} (${singer})`}
                                </li>
                            );
                        })}
                    </ul>
                </> : <ul className="active-list" id="activeList" title={title} style={{ display: 'none' }}></ul>
            :
            <>
                <ul className="song-list" title={title}>
                    {songArray.map((song) => (
                        <li key={song.id} onClick={() => toggleLoadSong(song, "")}>
                            {`${song.title} - ${song.artist}`}
                        </li>
                    ))}
                </ul>
            </>
    );
}

export default SongList;