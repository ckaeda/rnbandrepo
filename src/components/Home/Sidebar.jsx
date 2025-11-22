import '../../css/sidebar.css'
import SongList from './songList';
import LoadingSpinner from './LoadingSpinner';
import { useState, useEffect } from 'react';

function Sidebar({ toggleLoadSong, showSidebar, toggleSidebar }) {
    const [info, setInfo] = useState({});
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [filteredSongs, setFilteredSongs] = useState([]);

    const fetchAllSongs = async () => {
        const response = await fetch('api/getAllSongs');

        if (!response.ok) setError(response.error);
        else {
            const result = await response.json();
            setInfo(result.info);
            setSongs(result.songs);
            setLoading(false);

            localStorage.setItem("songs", JSON.stringify(result));
            setTimeout(() => { setLoading(false); }, 5000);

            var date = new Date();
            localStorage.setItem("lastUpdated", date.toLocaleDateString());
        }
    }

    const refreshSongs = async () => {
        setRefresh(true);
        await fetchAllSongs();
        setRefresh(false);
    }

    useEffect(() => {
        if (localStorage.getItem("songs") && !("info" in JSON.parse(localStorage.getItem("songs")))) {
            localStorage.removeItem("songs");
        }

        const localSongs = JSON.parse(localStorage.getItem("songs"))
        const now = new Date();
        const lastUpdated = new Date(localStorage.getItem("lastUpdated"));

        if (localSongs && (now - lastUpdated) / (1000 * 60 * 60 * 24) < 3) {
            setInfo(localSongs.info);
            setSongs(localSongs.songs);
            setLoading(false);
        } else {
            fetchAllSongs();
        }
    }, [])

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
                <img
                    className={`refresh-icon ${refresh ? 'rotate' : ''}`}
                    src='refresh.svg'
                    onClick={refreshSongs}
                />
                <input type="text" className="search-bar" id="searchBar" onChange={(e) => updateSongList(e.target.value)} />
                <SongList
                    type="active"
                    title={`SWC — ${info.swc_date}`}
                    songArray={filteredSongs.filter(song => song.swc && song.swc != 0).sort((a, b) => a.swc - b.swc)}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    type="active"
                    title={`TNL — ${info.tnl_date}`}
                    songArray={filteredSongs.filter(song => song.tnl && song.tnl != 0).sort((a, b) => a.tnl - b.tnl)}
                    toggleLoadSong={toggleLoadSong}
                />
                <SongList
                    type="active"
                    title={info.title}
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