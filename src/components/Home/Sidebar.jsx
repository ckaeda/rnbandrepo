import '../../css/sidebar.css'
import SongList from './songList';
import LoadingSpinner from './LoadingSpinner';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllSongs } from '../../functions/fetchAllSongs';

function Sidebar({ toggleLoadSong, showSidebar, toggleSidebar }) {
    const navigate = useNavigate();
    const [info, setInfo] = useState({});
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleFetchSongs = async () => {
        setRefresh(true);

        const songsData = await fetchAllSongs();
        setInfo(songsData.info);
        setSongs(songsData.songs);

        setLoading(false);
        setRefresh(false);
    }

    useEffect(() => {
        const localSongs = JSON.parse(localStorage.getItem("songs"))
        if (localSongs && !localSongs["info"]) {
            localStorage.removeItem("songs");
        }

        const now = new Date();
        if (localSongs && localStorage.getItem("lastUpdated")) {
            const lastUpdated = new Date(localStorage.getItem("lastUpdated"));
            const diffInHours = (now - lastUpdated) / (1000 * 60 * 60 * 24);
            if (diffInHours <= 3) {
                setInfo(localSongs.info);
                setSongs(localSongs.songs);
                setLoading(false);
            } else {
                handleFetchSongs();
            }
        } else {
            handleFetchSongs();
        }
    }, [])

    if (loading) return <LoadingSpinner />;

    const songLists = [
        { title: `SWC — ${info.swc_date}`, songArray: songs.filter(song => song.swc && song.swc != 0).sort((a, b) => a.swc - b.swc), date: info.swc_date },
        { title: `TNL — ${info.tnl_date}`, songArray: songs.filter(song => song.tnl && song.tnl != 0).sort((a, b) => a.tnl - b.tnl), date: info.tnl_date },
        { title: `${info.title} — ${info.event_date}`, songArray: songs.filter(song => song.event && song.event != 0).sort((a, b) => a.event - b.event), date: info.event_date },
    ].filter(list => list.date && list.date.trim() !== '');

    const today = new Date();
    songLists.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const diffA = dateA - today;
        const diffB = dateB - today;
        if (diffA >= 0 && diffB >= 0) return diffA - diffB;
        if (diffA < 0 && diffB < 0) return diffA - diffB;
        if (diffA >= 0) return -1;
        return 1;
    });

    return (
        <>
            <div className={"sidebar" + (showSidebar ? " show" : "")} id="sidebar">
                <h2 className="welcome-text" onClick={() => navigate('/editor')}>RN Band Song Repository</h2>
                <img
                    className={`refresh-icon ${refresh ? 'rotate' : ''}`}
                    src='refresh.svg'
                    onClick={handleFetchSongs}
                />
                <input type="text" className="search-bar" id="searchBar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                {songLists.map(list => (
                    <SongList
                        key={list.title}
                        type="active"
                        title={list.title}
                        songArray={list.songArray}
                        toggleLoadSong={toggleLoadSong}
                        searchTerm={searchTerm}
                    />
                ))}
                <SongList
                    title="ACTIVE ROTATION"
                    songArray={songs.filter(song => song.active).sort((a, b) => a.title.localeCompare(b.title))}
                    toggleLoadSong={toggleLoadSong}
                    searchTerm={searchTerm}
                />
                <SongList
                    title="SONG LIBRARY"
                    songArray={songs.filter(song => !song.active).sort((a, b) => a.title.localeCompare(b.title))}
                    toggleLoadSong={toggleLoadSong}
                    searchTerm={searchTerm}
                />
            </div>
            <button className="openbtn" id="openbtn" onClick={toggleSidebar} >☰</button>
        </>
    )
}

export default Sidebar