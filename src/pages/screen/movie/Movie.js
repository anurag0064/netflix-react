import React, { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../../../services/movies.service';
import MovieSearch from './component/movieSearch/MovieSearch';

const MovieList = () => {
  return (
    <div>
      <MovieSearch />
    </div>
  );
};
export default MovieList;
