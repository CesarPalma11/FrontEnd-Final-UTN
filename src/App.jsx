import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Recommended from './components/Recommended/Recommended';
import Favorites from './components/Favorites/Favorites';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Footer from './components/Footer/Footer';

import './reset.css';
import { useEffect, useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  return (
    <Router>  
      <div>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>  
            <Route path="/" element={<Main darkMode={darkMode} setDarkMode={setDarkMode} />} />  
            <Route path="/movie/:id" element={<MovieDetail darkMode={darkMode} setDarkMode={setDarkMode} />} />  
            <Route path="/recommended" element={<Recommended darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/favorites" element={<Favorites darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
