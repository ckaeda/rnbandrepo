import { useState } from 'react'
import './sidebar.css'
import SongList from './songList';

function Sidebar() {
    const [isShown, setIsShown] = useState(true);

    const toggleSidebar = () => {
        setIsShown(!isShown);
    }

    const testArray = [
        {
            title: 'Nobody Like You - Planetshakers',
            singer: "Julia"
        },
        {
            title: 'No One - Elevation Worship',
            singer: "Cara"
        },
        {
            title: 'Worthy - Elevation Worship',
            singer: "Cara"
        },
        {
            title: 'Worthy Of It All - CeCe Winans',
            singer: "Cara"
        },
        {
            title: 'Name Above All Names - Charity Gayle',
            singer: "Annaree"
        },
        {
            title: 'Faithfulness - Lakewood Music',
            singer: "Annaree"
        }
    ]

    return (
        <>
            <div className={"sidebar" + (isShown ? " show" : "")} id="sidebar">
                <h2 className="welcome-text">RN Band Song Repository</h2>
                <input type="text" className="search-bar" id="searchBar" />
                <SongList
                    type="active"
                    title="SWC"
                    songArray={testArray.map((song, index) => { return { title: song.title, singer: song.singer, id: index } })}
                />
                <ul className="active-list" id="activeListTNL" title="TNL"></ul>
                <ul className="active-list" id="activeListEvent" title=""></ul>
                <SongList
                    title="rotationList"
                    songArray={["Song 1", "Song 2", "Song 3"].map((song, index) => { return { title: song, id: index } })}
                />
                <SongList
                    title="songList"
                    songArray={["Song 1", "Song 2", "Song 3"].map((song, index) => { return { title: song, id: index } })}
                />
            </div>
            <button className="openbtn" id="openbtn" onClick={toggleSidebar} >☰</button>
        </>
    )
}

export default Sidebar