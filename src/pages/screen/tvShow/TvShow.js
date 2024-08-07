import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from '../../../config/constants';

const TVShowList = () => {
  const data = useParams()
  console.log("DATA ----",data)
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
  
    fetchTVShows();
  }, []);


  const fetchTVShows = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
        params: { api_key: API_KEY },
      });
      setTVShows(response.data.results);
    } catch (error) {
      console.error('Error fetching top rated TV shows:', error);
    }
  };

  return (
    <div className=" bg-[#262626] w-full h-[calc(100vh-5rem)] overflow-y-auto px-4 py-4">
      <h1 className="text-2xl text-[#e30a13] font-bold mb-4">Top Rated TV Shows</h1>
      <ul className="flex flex-wrap -mx-2">
        {tvShows.map((item) => (
          <li key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <div className="rounded-lg">
              <Link to={`/tv/${item.id}`}>
                {item.poster_path && (
                  <img
                    src={`${IMAGE_BASE_URL}${item.poster_path}`}
                    alt={`${item.name} poster`}
                    className="w-96 h-auto rounded-lg mb-2 hover:scale-105 hover:shadow-lg transition duration-30"
                  />
                )}
              </Link>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm text-white font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-700">Rating: {item.vote_average}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TVShowList;
