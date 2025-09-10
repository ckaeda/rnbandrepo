import './sidebar.css'
import SongList from './songList';
import { fetchAllSongs } from '../../hooks/fetchAllSongs';

function Sidebar({ setActiveSong, showSidebar, toggleSidebar }) {
    const { songs, loading, error } = fetchAllSongs();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className={"sidebar" + (showSidebar ? " show" : "")} id="sidebar">
                <h2 className="welcome-text">RN Band Song Repository</h2>
                <input type="text" className="search-bar" id="searchBar" />
                <SongList
                    type="active"
                    title="SWC"
                    songArray={songs.filter(song => song.swc != 0).sort((a, b) => a.swc - b.swc)}
                    setActiveSong={setActiveSong}
                />
                <SongList
                    type="active"
                    title="TNL"
                    songArray={songs.filter(song => song.tnl != 0).sort((a, b) => a.tnl - b.tnl)}
                    setActiveSong={setActiveSong}
                />
                <SongList
                    type="active"
                    title=""
                    songArray={songs.filter(song => song.event != 0).sort((a, b) => a.event - b.event)}
                    setActiveSong={setActiveSong}
                />
                <SongList
                    title="ACTIVE ROTATION"
                    songArray={songs.filter(song => song.active).sort((a, b) => a.title.localeCompare(b.title))}
                    setActiveSong={setActiveSong}
                />
                <SongList
                    title="SONG LIBRARY"
                    songArray={songs.filter(song => !song.active).sort((a, b) => a.title.localeCompare(b.title))}
                    setActiveSong={setActiveSong}
                />
            </div>
            <button className="openbtn" id="openbtn" onClick={toggleSidebar} >☰</button>
        </>
    )
}

export default Sidebar