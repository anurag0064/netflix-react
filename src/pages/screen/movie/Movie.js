import React, { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../../../config/axios.config';
import { IMAGE_BASE_URL, ADD_TO_FAVORITES_ENDPOINT, API_KEY } from '../../../config/config';
import axios from 'axios';
import Button from '../../../components/buttons/Button';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await fetchPopularMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleAddToFavorites = async (movieId) => {
    try {
      const response = await axios.post(ADD_TO_FAVORITES_ENDPOINT.replace('{account_id}', 'your_account_id'), {
        media_type: 'movie',
        media_id: movieId,
        favorite: true
      }, {
        params: {
          api_key: API_KEY
        }
      });

      console.log('Movie added to favorites:', response.data);
      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
      alert('Failed to add movie to favorites. Please try again.');
    }
  };

  return (
    <div className="bg-[#262626] w-full h-[calc(100vh-5rem)] overflow-y-auto px-4 py-4">
      <h1 className="text-2xl text-[#e30a13] font-bold mb-4">Popular Movies</h1>
      <ul className="flex flex-wrap -mx-2">
        {movies.map(item => (
          <li key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <div className="rounded-lg">
              {item.poster_path && (
                <img
                  src={`${IMAGE_BASE_URL}${item.poster_path}`}
                  alt={`${item.title} poster`}
                  className="w-full h-auto rounded-lg mb-2"
                />
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm text-white font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700">Rating: {item.vote_average}</p>
              <Button
                text="Add to Favorites"
                className="flex items-center rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2"
                onClick={() => handleAddToFavorites(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieList;
