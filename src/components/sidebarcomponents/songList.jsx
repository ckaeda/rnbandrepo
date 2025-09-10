

function SongList({ type, title, songArray, setActiveSong }) {
    return (
        type === "active"
            ? <>
                <ul className="active-list" id="activeList" title={title}>
                    {songArray.map((song) => (
                        <li key={song.id} data-singer={song.singer} onClick={() => setActiveSong(song)}>
                            {`${song.title} - ${song.artist} (${song.singer})`}
                        </li>
                    ))}
                </ul>
            </>
            :
            <>
                <ul className="song-list" title={title}>
                    {songArray.map((song) => (
                        <li key={song.id}>{song.title}</li>
                    ))}
                </ul>
            </>
    );
}

export default SongList;