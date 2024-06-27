import Axios from "../config/axios.config";



export const fetchMedia1 = async (id) => {
  try {
    const res = await Axios.get(`/tv/${id}/configuration`);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
};