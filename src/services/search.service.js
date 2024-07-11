
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config/constants';
import Axios from '../config/axios.config';
 

export const searchMovies = async (query) => {
    
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

  try {
    const response = await Axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching the movies", error);
    throw error;
  }
};


const fetchMovies = async (query, page) => {
    try {
        const response = await Axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query,
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from TMDB', error);
        throw error;
    }
};

const fetchDefaultMovies = async () => {
    try {
        const response = await Axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                page: 1,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching default movies from TMDB', error);
        throw error;
    }
};

export { fetchMovies, fetchDefaultMovies };
