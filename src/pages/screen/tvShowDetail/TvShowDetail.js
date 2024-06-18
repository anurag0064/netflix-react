import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, API_KEY, IMAGE_BASE_URL, VIDEO_BASE_URL } from '../../../config/config';

const TVShowDetail = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tv/${id}`, {
          params: { api_key: API_KEY },
        });
        setTVShow(response.data);
      } catch (error) {
        console.error(`Error fetching TV show details:`, error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tv/${id}/videos`, {
          params: { api_key: API_KEY },
        });
        setVideos(response.data.results);
      } catch (error) {
        console.error(`Error fetching videos:`, error);
      }
    };

    fetchTVShow();
    fetchVideos();
  }, [id]);

  if (!tvShow) return <div>Loading...</div>;

  return (
    <div className="bg-[#262626] w-full h-[calc(100vh-5rem)] overflow-y-auto px-4 py-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">Back to list</Link>
      <div className="rounded-lg">
        {tvShow.poster_path && (
          <img
            src={`${IMAGE_BASE_URL}${tvShow.poster_path}`}
            alt={`${tvShow.name} poster`}
            className="rounded-lg mb-2"
          />
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl text-white font-semibold mb-2">{tvShow.name}</h2>
        <p className="text-gray-700">Rating: {tvShow.vote_average}</p>
        <p className="text-white mt-4">{tvShow.overview}</p>
        {videos.length > 0 && (
          <div>
            <p className="text-white mt-4">Videos:</p>
            <ul>
              {videos.map((video) => (
                <li key={video.id}>
                  <a
                    href={`${VIDEO_BASE_URL}${video.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {video.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShowDetail;
