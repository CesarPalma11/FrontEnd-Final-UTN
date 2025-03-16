import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import Navbar from "../Navbar/Navbar";
import PropTypes from "prop-types";
import "./Favorites.css";

const Favorites = ({darkMode, setDarkMode}) => {
  const [favoriteMovies, setFavoriteMovies] = useState({});
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("likedMovies")) || {};
    setFavoriteMovies(storedFavorites);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery.trim() === "") {
        setMovies(Object.values(favoriteMovies)); 
        return;
      }
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=984f4713&s=${searchQuery}`
        );
        const result = await response.json();

        if (result.Search) {
          setMovies(result.Search); 
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [searchQuery, favoriteMovies]); 

  const toggleLike = (movie) => {
    setFavoriteMovies((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      
      if (updatedFavorites[movie.imdbID]) {
        delete updatedFavorites[movie.imdbID]; 
      } else {
        updatedFavorites[movie.imdbID] = movie; 
      }

      localStorage.setItem("likedMovies", JSON.stringify(updatedFavorites));
      return updatedFavorites; 
    });
  };

  return (
    <div className={`container-gl ${darkMode ? "dark-theme" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onSearch={setSearchQuery} />
      <div className="contain-main">
        <h1>{searchQuery ? "Resultados de la búsqueda" : "Mis Películas Favoritas ❤️"}</h1>
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                isLiked={!!favoriteMovies[movie.imdbID]}
                toggleLike={toggleLike} 
                navigate={navigate} 
              />
            ))
          ) : (
            <p className="text-fav">Aun no tienes peliculas favoritas...</p>
          )}
        </div>
      </div>
    </div>
  );
};
Favorites.propTypes = {
  darkMode: PropTypes.bool.isRequired, 
  setDarkMode: PropTypes.func.isRequired, 
};

export default Favorites;
