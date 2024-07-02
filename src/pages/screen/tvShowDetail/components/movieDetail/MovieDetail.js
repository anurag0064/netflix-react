import React, { useEffect, useState } from 'react';
import { API_KEY } from '../../../../../config/constants';

const CastList = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const apiKey = API_KEY; 
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cast');
        }
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Movie Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name} as {actor.character}</li>
        ))}
      </ul>
    </div>
  );
};

export default CastList;
