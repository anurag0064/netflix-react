import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../../components/buttons/Button';
import { fetchFandom, fetchMedia, fetchTVShow, fetchVideos } from '../../../services/movies.service';
import { IMAGE_BASE_URL,VIDEO_BASE_URL } from '../../../config/constants';

const TVShowDetail = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [videos, setVideos] = useState([]);
  const [media, setMedia] = useState([]);
  const [fandom, setFandom] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);


  const Loader = () => (
    <div className="flex justify-center items-center h-full bg-[#262626]">
      <div className="animate-spin rounded-full  h-12 w-12 border-t-2 border-b-2 border-white-900"></div>
    </div>
  );


  const fetchData = async () => {
    try {
      setLoading(true);
      const tvShowData = await fetchTVShow(id);
      setTVShow(tvShowData);

      const videosData = await fetchVideos(id);
      setVideos(videosData);

      const mediaData = await fetchMedia(id);
      setMedia(mediaData);

      const fandomData = await fetchFandom(id);
      setFandom(fandomData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [id]);

 if (loading) return <Loader />; 

  return (
    <div className="bg-[#262626] w-full h-[calc(100vh-5rem)] overflow-y-auto px-4 py-4">
      <div className="rounded-lg">
        <div className="w-full p-2 flex justify-center space-x-4 z-10">
          <Button
            text="Overview"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'text-white' : 'text-gray-500'}`}
          />
          <Button
            text="Videos"
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'videos' ? 'text-white' : 'text-gray-500'}`}
          />
          <Button
            text="Media"
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'media' ? 'text-white' : 'text-gray-500'}`}
          />
          <Button
            text="Fandom"
            onClick={() => setActiveTab('fandom')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'fandom' ? 'text-white' : 'text-gray-500'}`}
          />
        </div>
        {tvShow.poster_path && (
          <div className='bg-[#e30a13] h-96'>
            <img
            src={`${IMAGE_BASE_URL}${tvShow.poster_path}`}
            alt={`${tvShow.name} poster`}
            className="w-auto h-96 rounded-lg mb-2 object-cover p-6 hover:filter hover:blur-sm"
          />
          </div>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <h2 className="text-2xl text-white font-semibold mb-2">{tvShow.name}</h2>
        {activeTab === 'overview' && (
          <>
            <p className="text-gray-700">Rating: {tvShow.vote_average}</p>
            <p className="text-white mt-4">{tvShow.overview}</p>
          </>
        )}
        {activeTab === 'videos' && videos.length > 0 && (
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
        {activeTab === 'media' && media.length > 0 && (
          <div>
            <p className="text-white mt-4">Media:</p>
            <ul className="grid grid-cols-4  gap-4">
              {media.map((image, index) => (
                <li key={index}>
                  <img
                    src={`${IMAGE_BASE_URL}${image.file_path}`}
                    alt="Media"
                    className="flex w-full h-auto object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'fandom' && fandom.length > 0 && (
          <div>
            <p className="text-white mt-4">Fandom:</p>
            <ul>
              {fandom.map((review) => (
                <li key={review.id} className="mb-4">
                  <p className="text-white"><strong>{review.author}</strong> says:</p>
                  <p className="text-gray-400">{review.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">Back to list</Link>
    </div>
  );
};

export default TVShowDetail;
