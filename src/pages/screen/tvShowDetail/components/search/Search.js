import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../../../../../config/constants';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching the movies", error);
    }
  };

  return (
    <div>
      <form onSubmit={searchMovies}>
        <div className='flex gap-4'>
        <label htmlFor="query" className='text-2xl text-white'>Movie Name</label>
        <input 
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className='text-white'>Search</button>
        </div>
      </form>

      <div>
        {movies.length > 0 && (
          <ul>
            {movies.map(movie => (
              <li className="grid grid-cols-6" key={movie.id}>
                {movie.poster_path && (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                    alt={`${movie.title} poster`} 
                    className="w-auto h-96"
                  />
                )}
                <h3 className='text-white'>{movie.title}</h3>
                <p className='text-white'>Released: {movie.release_date}</p>
                <p className='text-white'>Rating: {movie.vote_average}</p>
                <p className='text-white'>{movie.overview}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
