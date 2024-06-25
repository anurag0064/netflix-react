import Axios from "../config/axios.config";

export const loginUser = async () => {
    try {
        const res = await Axios.get(`/account/null`);
        return res.data.results;    
    } catch (error) {
        return error;
    }
}