import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Editor from './views/Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;