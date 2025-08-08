import {BrowserRouter, Routes, Route }from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './pages/Login';
import Register from './pages/Resgister';
import DiaryList from './pages/DiaryList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/diaries" element={<DiaryList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
