import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import Navbar from "../Navbar/Navbar";
import PropTypes from "prop-types";
import "./Main.css";

const Main = ({ darkMode, setDarkMode }) => { 
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedMovies, setLikedMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("likedMovies")) || {};
  });
  const [page, setPage] = useState(1); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://www.omdbapi.com/?apikey=984f4713&s=${searchQuery || "action"}&page=${page}`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.Search) {
          setMovies((prevMovies) => 
            page === 1 ? result.Search : [...prevMovies, ...result.Search] 
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery, page]); 

  const handleSearch = (query) => {
    setSearchQuery(query);
    setMovies([]); 
    setPage(1); 
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  const toggleLike = (movie) => {
    setLikedMovies((prev) => {
      const updatedLikes = { ...prev };
      if (updatedLikes[movie.imdbID]) {
        delete updatedLikes[movie.imdbID];
      } else {
        updatedLikes[movie.imdbID] = movie;
      }

      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  return (
    <div className={`container-gl ${darkMode ? "dark-theme" : ""}`}>
      
      <Navbar onSearch={handleSearch} darkMode={darkMode} setDarkMode={setDarkMode} />  
      <div className="contain-main">
        <h1>Películas encontradas:</h1>
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isLiked={!!likedMovies[movie.imdbID]}
                toggleLike={toggleLike}
                navigate={navigate}
              />
            ))
          ) : (
            <p>No se encontraron películas...</p>
          )}
        </div>
       
        <div className="load-more-container">
          <button className="load-more-button" onClick={loadMoreMovies}>
            Cargar más
          </button>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  darkMode: PropTypes.bool.isRequired, 
  setDarkMode: PropTypes.func.isRequired, 
};

export default Main;