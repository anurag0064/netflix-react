import axios from 'axios';
import { API_KEY, BASE_URL } from './config';


export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching the movies: ", error);
    return [];
  }
};
