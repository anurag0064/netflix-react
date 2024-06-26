import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../../components/buttons/Button';
import { fetchFandom, fetchMedia, fetchTVShow, fetchVideos, fetchPeople} from '../../../services/movies.service';
import { IMAGE_BASE_URL, VIDEO_BASE_URL } from '../../../config/constants';
import ImageModal from './components/modal/Modal';



const TVShowDetail = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [videos, setVideos] = useState([]);
  const [media, setMedia] = useState([]);
  const [fandom, setFandom] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [people, setPeople] = useState([]);
  

  const Loader = () => (
    <div className="flex justify-center items-center h-full bg-[#262626]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white-900"></div>
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

      // const peopleData = await fetchPeople(id);
      // setPeople(peopleData); 

      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(`${IMAGE_BASE_URL}${image.file_path}`);
    setIsModalOpen(true);
  };

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
        <div className='flex'>
          {tvShow.poster_path && (
            <div className='relative flex h-96 w-full text-white'>
              <div
                className='absolute inset-0 bg-black opacity-40'
                style={{
                  backgroundImage: `url(${IMAGE_BASE_URL}${tvShow.backdrop_path})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className='relative z-10 flex p-6 gap-6'>
                <img
                  src={`${IMAGE_BASE_URL}${tvShow.poster_path}`}
                  alt={`${tvShow.name} poster`}
                  className='w-auto h-full rounded-lg mb-2 object-cover hover:filter hover:blur-sm'
                />
                <div className='flex flex-col gap-3'>
                  <h2 className='text-3xl text-white font-bold '>{tvShow.name}</h2>
                  <p className='text-white text-xs'>Rating: {tvShow.vote_average}</p>
                  <p className='text-white'>{tvShow.overview}</p>
                </div>
              </div>
            </div>
          )}
          <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
      <div className="flex flex-col mt-4">
      {/* {activeTab === 'overview' && (
            // <h3 className="text-white text-xl font-bold">Cast</h3>
            // <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            //   {people.cast.map((person) => (
            //     <li key={person.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            //       <img
            //         src={`${IMAGE_BASE_URL}${person.profile_path}`}
            //         alt={person.name}
            //         className="w-full h-40 object-cover rounded-lg mb-2"
            //       />
            //       <p className="text-white text-sm">{person.name}</p>
            //       <p className="text-gray-400 text-xs">{person.character}</p>
            //     </li>
            //   ))}
            // </ul>
            // <h3 className="text-white text-xl font-bold mt-6">Crew</h3>
            // <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            //   {people.crew.map((person) => (
            //     <li key={person.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            //       <img
            //         src={`${IMAGE_BASE_URL}${person.profile_path}`}
            //         alt={person.name}
            //         className="w-full h-40 object-cover rounded-lg mb-2"
            //       />
            //       <p className="text-white text-sm">{person.name}</p>
            //       <p className="text-gray-400 text-xs">{person.job}</p>
            //     </li>
            //   ))}
            // </ul>
        
        )}; */}
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
            <ul className="grid grid-cols-4 gap-4 ">
              {media.map((image, index) => (
                <li key={index}>
                  <div className='max-w-sm rounded bg-gray-800 p-1 overflow-hidden shadow-lg'>
                  <img
                    src={`${IMAGE_BASE_URL}${image.file_path}`}
                    alt="Media"
                    className="flex w-full h-auto object-cover cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                  </div>
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
