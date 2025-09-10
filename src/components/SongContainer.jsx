import './songcontainer.css'

function SongContainer() {
    return (
        <>
            <div className="lyrics-container" id="main">
                <h1 id="title"></h1>
                <h2 id="artist"></h2>
                <div id="lyricsContainer"></div>
            </div>
        </>
    )
}

export default SongContainer