// import Axios from "../config/axios.config";

import { wait } from "@testing-library/user-event/dist/utils";
import Axios from "../config/axios.config";

// export const fetchPerson = async () => {
//     try {
//       const response = await Axios.get(`/person/changes?page=1`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching person details:', error);
//       return error;
//     }
//   };


export const fetchPeople = async (id) => {
    try{
        const res = await Axios.get(`/tv/${id}`);
        return res.data;
    } catch (error) {
      console.error('error fetching Tv People list:',error)
      return error;
    }
  };

