// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Editor from './components/Editor';
import { useAllSongs } from './hooks/useAllSongs';

function App() {
  const { songs, loading, error } = useAllSongs();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home allSongs={{songs, loading, error}} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor allSongs={{songs, loading, error}} />} />
      </Routes>
    </div>
  );
}

export default App;