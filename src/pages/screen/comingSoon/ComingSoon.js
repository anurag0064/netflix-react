import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, IMAGE_BASE_URL } from '../../../config/config';


function ComingSoon() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching the movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='bg-[#262626] w-full h-[calc(100vh-5rem)] overflow-y-auto px-4 py-4'>
      <div className='flex flex-col'>
        <h1 className='text-[#e30a13] text-2xl mb-4'>Coming Soon</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {movies.map(movie => (
            <div key={movie.id} className=' rounded'>
              {movie.poster_path ? (
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className='w-full h-auto rounded-lg mb-2 hover:scale-105 hover:shadow-lg transition duration-300' />
              ) : (
                <div className='w-full h-[300px] bg-gray-700 rounded mb-4 flex items-center justify-center'>
                  <span className='text-gray-400'>No Image Available</span>
                </div>
              )}
              <h2 className='text-white text-sm'>{movie.title}</h2>
              <p className='text-gray-400 text-sm'>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ComingSoon;
