// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Editor/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;