import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../../config/axios.config';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchPopularMovies();
        setMovies(movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="bg-gray-800 w-full h-[calc(100vh-5rem)] overflow-y-auto px-4 py-4">
      <ul className="flex flex-wrap -mx-2">
        {movies.map((movie) => (
          <li key={movie.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <div className="">
              <img
                className="w-full h-auto rounded-md mb-4"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2 className="text-white text-sm mb-2">{movie.title}</h2>
              <p className="text-gray-400 text-sm">Rating: {movie.vote_average}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;