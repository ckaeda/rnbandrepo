

function SongList({ type, title, songArray }) {
    return (
        type === "active"
            ? <>
                <ul className="active-list" id="activeList" title={title}>
                    {songArray.map((song) => (
                        <li key={song.id} data-singer={song.singer}>
                            {`${song.title} (${song.singer})`}
                        </li>
                    ))}
                </ul>
            </>
            :
            <>
                <ul className="song-list" id="rotationList" title={title == "rotationList" ? "ACTIVE ROTATION" : "SONG LIBRARY"}>
                    {songArray.map((song) => (
                        <li key={song.id}>{song.title}</li>
                    ))}
                </ul>
            </>
    );
}

export default SongList;