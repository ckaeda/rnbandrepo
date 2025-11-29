import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Editor from './views/Editor';
import SongEditor from './components/Editor/SongEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:id" element={<SongEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;