import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(() => {
    const storedValue = localStorage.getItem("movie");
    return storedValue ? JSON.parse(storedValue) : null;
  });
  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          const response = await fetch(`http://localhost:9000/films/${id}`);
          const data = await response.json();
          setMovie(data);
          localStorage.setItem(`film_${id}`, JSON.stringify(data));
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
      fetchMovieDetails();
    },
    [id]
  );
  if (!movie) {
    return <div className="div">🚫درحال بارگذاری</div>;
  } else {
    return (
      <div className={styles.MovieDetails}>
        <h1>{movie.title}</h1>
        <img src={movie.image} alt={movie.title} />
        <h4>کارگردان: {movie.director}</h4>
        <p> ژانر: {movie.genre}</p>
        <p> خلاصه داستان: {movie.synopsis} </p>
      </div>
    );
  }
}

export default MovieDetails;
