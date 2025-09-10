import { useEffect, useState } from 'react'
// import './App.css'
import SongContainer from './components/SongContainer'
import Options from './components/Options'
import Sidebar from './components/sidebarcomponents/Sidebar'

function App() {
  const [activeSong, setActiveSong] = useState({});

  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const [showOptions, setShowOptions] = useState(true);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    if (!activeSong.title) return;
    if (showSidebar) toggleSidebar();
    if (showOptions) toggleOptions();
  }, [activeSong]);

  return (
    <>
      <Sidebar 
        setActiveSong={setActiveSong}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
      />
      <Options 
        showOptions={showOptions}
        toggleOptions={toggleOptions}
      />
      <SongContainer 
        activeSong={activeSong}
      />
    </>
  )
}

export default App
