import './songcontainer.css'

function SongContainer({ activeSong }) {
    return (
        <>
            <div className="lyrics-container" id="main">
                <h1 id="title">{activeSong.title}</h1>
                <h2 id="artist">{activeSong.artist}</h2>
                <div id="lyricsContainer">{activeSong.lyrics}</div>
            </div>
        </>
    )
}

export default SongContainer