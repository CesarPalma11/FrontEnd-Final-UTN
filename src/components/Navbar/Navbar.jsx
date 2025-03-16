import "./Navbar.css";
import { FaSearch, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode, onSearch, }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode)); 
      return newMode;
    });
  };
  
  const handleIconClick = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className={`header ${darkMode ? "dark-theme" : ""}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" className="logo">LOGO</Link>
        <Link to="/" onClick={toggleMenu}>Inicio</Link>
        <Link to="/recommended" onClick={toggleMenu}>Recomendados</Link>
        <Link to="/favorites" onClick={toggleMenu}>Favoritos</Link>
      </nav>
      
      <div className="search-theme-container">
        <div className="search-box">
          <div className="search-icon-circle" onClick={handleIconClick}>
            <FaSearch className="search-icon" />
          </div>
          <input
            className={isSearchVisible ? "visible" : ""}
            type="text"
            placeholder="Busca una película..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FaSun className="icon-sun"/> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};
Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired, 
  darkMode: PropTypes.bool.isRequired, 
  setDarkMode: PropTypes.func.isRequired, 
};
export default Navbar;