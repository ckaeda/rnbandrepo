import './sidebar.css'

function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar show" id="sidebar">
                    <h2 className="welcome-text">RN Band Song Repository</h2>
                    <input type="text" className="search-bar" id="searchBar" />
                    <ul className="active-list" id="activeList" title="SWC"></ul>
                    <ul className="active-list" id="activeListTNL" title="TNL"></ul>
                    <ul className="active-list" id="activeListEvent" title=""></ul>
                    <ul className="song-list" id="rotationList" title="ACTIVE ROTATION"></ul>
                    <ul className="song-list" id="songList" title="SONG LIBRARY"></ul>
                </div>
            </div>
            <button className="openbtn" id="openbtn">☰</button>
        </>
    )
}

export default Sidebar