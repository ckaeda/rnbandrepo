import { useState } from 'react'
import './sidebar.css'

function Sidebar() {
    const [isShown, setIsShown] = useState(true);

    const toggleSidebar = () => {
        setIsShown(!isShown);
    }

    return (
        <>
            <div className={"sidebar" + (isShown ? " show" : "")} id="sidebar">
                <h2 className="welcome-text">RN Band Song Repository</h2>
                <input type="text" className="search-bar" id="searchBar" />
                <ul className="active-list" id="activeList" title="SWC"></ul>
                <ul className="active-list" id="activeListTNL" title="TNL"></ul>
                <ul className="active-list" id="activeListEvent" title=""></ul>
                <ul className="song-list" id="rotationList" title="ACTIVE ROTATION"></ul>
                <ul className="song-list" id="songList" title="SONG LIBRARY"></ul>
            </div>
            <button className="openbtn" id="openbtn" onClick={toggleSidebar} >☰</button>
        </>
    )
}

export default Sidebar