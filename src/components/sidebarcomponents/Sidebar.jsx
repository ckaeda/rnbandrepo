import './sidebar.css'
import SongList from './songList';

function Sidebar({ setActiveSong, showSidebar, toggleSidebar }) {
    const testArray = [
        {
            title: 'Nobody Like You',
            artist: 'Planetshakers',
            singer: "Julia"
        },
        {
            title: 'No One',
            artist: 'Elevation Worship',
            singer: "Cara"
        },
        {
            title: 'Worthy',
            artist: 'Elevation Worship',
            singer: "Cara"
        },
        {
            title: 'Worthy Of It All',
            artist: 'CeCe Winans',
            singer: "Cara"
        },
        {
            title: 'Name Above All Names',
            artist: 'Charity Gayle',
            singer: "Annaree"
        },
        {
            title: 'Faithfulness',
            artist: 'Lakewood Music',
            singer: "Annaree"
        }
    ]

    return (
        <>
            <div className={"sidebar" + (showSidebar ? " show" : "")} id="sidebar">
                <h2 className="welcome-text">RN Band Song Repository</h2>
                <input type="text" className="search-bar" id="searchBar" />
                <SongList
                    type="active"
                    title="SWC"
                    songArray={testArray.map((song, index) => { return { ...song, id: index } })}
                    setActiveSong={setActiveSong}
                />
                <ul className="active-list" id="activeListTNL" title="TNL"></ul>
                <ul className="active-list" id="activeListEvent" title=""></ul>
                <SongList
                    title="ACTIVE ROTATION"
                    songArray={["Song 1", "Song 2", "Song 3"].map((song, index) => { return { title: song, id: index } })}
                />
                <SongList
                    title="SONG LIBRARY"
                    songArray={["Song 1", "Song 2", "Song 3"].map((song, index) => { return { title: song, id: index } })}
                />
            </div>
            <button className="openbtn" id="openbtn" onClick={toggleSidebar} >☰</button>
        </>
    )
}

export default Sidebar