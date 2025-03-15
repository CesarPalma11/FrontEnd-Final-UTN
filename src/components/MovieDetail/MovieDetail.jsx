import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      let url = `https://www.omdbapi.com/?apikey=984f4713&i=${id}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
          setMovie(result);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="movie-detail-container">
      <h1>{movie.Title}</h1>
      <div className="movie-detail">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
          alt={movie.Title}
          className="movie-poster"
        />
        <div className="movie-info">
          <p><strong>Año:</strong> {movie.Year}</p>
          <p><strong>Género:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actores:</strong> {movie.Actors}</p>
          <p><strong>Sinopsis:</strong> {movie.Plot}</p>
          <p><strong>Calificación:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
