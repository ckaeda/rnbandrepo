import { useState } from 'react'
// import './App.css'
import SongContainer from './components/SongContainer'
import Options from './components/Options'
import Sidebar from './components/sidebarcomponents/Sidebar'

function App() {
  return (
    <>
      <Sidebar />
      <Options />
      <SongContainer />
    </>
  )
}

export default App
