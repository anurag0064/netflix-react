import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../../../../../config/constants';

const BilledCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
          
        );
        console.log("response ---",response)
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching the cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#f44336] mb-4">Billed Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.slice(0, 12).map((actor) => (
          <div key={actor.cast_id} className="text-center">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="w-full h-56 mb-2 object-cover rounded"
            />
            <h3 className="text-sm font-medium text-white">{actor.name}</h3>
            <p className="text-xs text-gray-500">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BilledCast;
