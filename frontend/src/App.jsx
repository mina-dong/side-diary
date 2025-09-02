import {BrowserRouter, Routes, Route }from 'react-router-dom';
import './App.css'

import Login from './pages/Login';
import Register from './pages/Resgister';
import Main from './pages/DiaryList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
