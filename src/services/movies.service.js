import Axios from "../config/axios.config";

export const fetchPopularMovies = async () => {
  try {
    const res = await Axios.get('/movie/popular');
    return res.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return error;
  }
};

export const fetchTVShows = async () => {
  try {
    const res = await Axios.get('/tv/top_rated');
    return res.data.results;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return error;
  }
};

export const fetchFandom = async (id) => {
  try {
    const res = await Axios.get(`/tv/${id}/reviews`);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching fandom:', error);
    return error;
  }
};

export const fetchMedia = async (id) => {
  try {
    const res = await Axios.get(`/tv/${id}/images`);
    return res.data.backdrops;
  } catch (error) {
    console.error('Error fetching media:', error);
    return error;
  }
};

export const fetchVideos = async (id) => {
  try {
    const res = await Axios.get(`/tv/${id}/videos`);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return error;
  }
};

export const fetchTVShow = async (id) => {
  try {
    const res = await Axios.get(`/tv/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return error;
  }
};
