import { FaHeart, FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import "./MovieCard.css";

const MovieCard = ({ movie, isLiked, toggleLike, navigate, }) => {
  const handleMovieClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div className="movie-item" onClick={handleMovieClick}>
      <div className="movie-image-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
          alt={movie.Title}
          className="movie-image"
        />
     
        <button
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); 
            toggleLike(movie);
          }}
        >
          <FaHeart />
        </button>
      </div>

    
      <div className="movie-hover">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        
        <button
          className="play-button"
          onClick={(e) => {
            e.stopPropagation(); 
            handleMovieClick();
          }}
        >
          <FaPlay /> Ver Película
        </button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  isLiked: PropTypes.bool.isRequired,
  toggleLike: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default MovieCard;
