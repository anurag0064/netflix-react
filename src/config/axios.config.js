import axios from 'axios';
import { API_KEY, BASE_URL } from './constants';


const Axios = axios.create({
	baseURL: BASE_URL,
});

Axios.interceptors.request.use(
	function (config) {
		config.headers = {
			...config.headers,
			Authorization: `${localStorage.getItem('token')}`,
		};

    config.params = {
      ...config.params,
      api_key: API_KEY
    }

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default Axios;
