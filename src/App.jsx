// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Editor/Login';
import Editor from './Editor/Editor';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;