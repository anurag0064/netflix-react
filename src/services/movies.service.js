import Axios from "../config/axios.config";

export const fetchPopularMovies = async () => {
    try {
        const res = await Axios.get(`/movie/popular`);
        return res.data.results;    
    } catch (error) {
        return error;
    }
}