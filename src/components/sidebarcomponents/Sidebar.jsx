import './sidebar.css'
import SongList from './songList';
import { fetchAllSongs } from '../../hooks/fetchAllSongs';
import LoadingSpinner from '../LoadingSpinner';

function Sidebar({ toggleLoadSong, showSidebar, toggleSidebar }) {
    const { songs, loading, error } = fetchAllSongs();

    if (loading) return <LoadingSpinner />;
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
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    type="active"
                    title="TNL"
                    songArray={songs.filter(song => song.tnl != 0).sort((a, b) => a.tnl - b.tnl)}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    type="active"
                    title=""
                    songArray={songs.filter(song => song.event != 0).sort((a, b) => a.event - b.event)}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    title="ACTIVE ROTATION"
                    songArray={songs.filter(song => song.active).sort((a, b) => a.title.localeCompare(b.title))}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    title="SONG LIBRARY"
                    songArray={songs.filter(song => !song.active).sort((a, b) => a.title.localeCompare(b.title))}
                    toggleLoadSong={toggleLoadSong}
                />
            </div>
            <button className="openbtn" id="openbtn" onClick={toggleSidebar} >☰</button>
        </>
    )
}

export default Sidebar