import './sidebar.css'
import SongList from './songList';
import { fetchAllSongs } from '../../hooks/fetchAllSongs';
import LoadingSpinner from '../LoadingSpinner';
import { useState, useEffect } from 'react';

function Sidebar({ toggleLoadSong, showSidebar, toggleSidebar }) {
    const { songs, loading, error } = fetchAllSongs();
    const [filteredSongs, setFilteredSongs] = useState([]);

    useEffect(() => {
        setFilteredSongs(songs);
    }, [songs]);

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error: {error}</p>;

    const updateSongList = (value) => {
        setFilteredSongs(songs.filter(song => song.title.toLowerCase().includes(value.toLowerCase()) || song.artist.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <>
            <div className={"sidebar" + (showSidebar ? " show" : "")} id="sidebar">
                <h2 className="welcome-text">RN Band Song Repository</h2>
                <input type="text" className="search-bar" id="searchBar" onChange={(e) => updateSongList(e.target.value)} />
                <SongList
                    type="active"
                    title="SWC"
                    songArray={filteredSongs.filter(song => song.swc && song.swc != 0).sort((a, b) => a.swc - b.swc)}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    type="active"
                    title="TNL"
                    songArray={filteredSongs.filter(song => song.tnl && song.tnl != 0).sort((a, b) => a.tnl - b.tnl)}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    type="active"
                    title="PRAISE & PRAYER TNL"
                    songArray={filteredSongs.filter(song => song.event && song.event != 0).sort((a, b) => a.event - b.event)}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    title="ACTIVE ROTATION"
                    songArray={filteredSongs.filter(song => song.active).sort((a, b) => a.title.localeCompare(b.title))}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    title="SONG LIBRARY"
                    songArray={filteredSongs.filter(song => !song.active).sort((a, b) => a.title.localeCompare(b.title))}
                    toggleLoadSong={toggleLoadSong}
                />
            </div>
            <button className="openbtn" id="openbtn" onClick={toggleSidebar} >☰</button>
        </>
    )
}

export default Sidebar