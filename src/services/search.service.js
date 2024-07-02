
import axios from 'axios';
import { API_KEY } from '../config/constants';
 

export const searchMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching the movies", error);
    throw error;
  }
};
