import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import Navbar from "../Navbar/Navbar";
import PropTypes from "prop-types";
import "./Recommended.css";

const Recommended = ({ darkMode, setDarkMode }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [likedMovies, setLikedMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("likedMovies")) || {};
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      setLoading(true);
      let url = `http://www.omdbapi.com/?apikey=984f4713&s=${searchQuery || "drama"}&page=${page}`;

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
      setLoading(false);
    };

    fetchRecommendedMovies();
  }, [searchQuery, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setMovies([]);
    setPage(1);
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
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onSearch={handleSearch} />
      <div className="contain-main">
        <h1>Películas recomendadas:</h1>
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
        {loading && <p>Cargando más películas...</p>}
      </div>
    </div>
  );
};
Recommended.propTypes = {
  darkMode: PropTypes.bool.isRequired, 
  setDarkMode: PropTypes.func.isRequired, 
};
export default Recommended;
