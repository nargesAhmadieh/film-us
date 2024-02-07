import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
export default function Homepage() {
  const [films, setFilms] = useState(() => {
    const storedValue = localStorage.getItem("films");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  function handleDeleteFilms(id) {
    
    const updateFilms = films.filter((film) => film.id !== id);
    localStorage.setItem("films", JSON.stringify(updateFilms));
    setFilms(updateFilms);
  }
  useEffect(function () {
    async function fetchFilm() {
      try {
        const response = await fetch("http://localhost:9000/films");
        const data = await response.json();
        setFilms(data);
        localStorage.setItem("films", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }
    fetchFilm();
  }, []);
  return (
    <main className={styles.homepage}>
      <h1>فیلم ها</h1>
      <ul>
        {films.map((film) => {
          return (
            <li key={film.title}>
              <Link to={`/movies/${film.id}`}>
                <img src={film.image} alt={film.title} />
                <h2>{film.title}</h2>
              </Link>
              <button onClick={() => handleDeleteFilms(film.id)}>حذف</button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
