import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../../components/buttons/Button';
import { fetchFandom, fetchMedia, fetchTVShow, fetchVideos, fetchPeople} from '../../../services/movies.service';
import { IMAGE_BASE_URL, VIDEO_BASE_URL } from '../../../config/constants';
import ImageModal from './components/modal/Modal';
import { FaList } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Loader from '../../../components/loader/Loader';
// import Personal from './components/personal/Personal';


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
            text="Media"
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'media' ? 'text-white' : 'text-gray-500'}`}
          />
          <Button
            text="Fandom"
            onClick={() => setActiveTab('fandom')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'fandom' ? 'text-white' : 'text-gray-500'}`}
          />
          <Button
            text="Share"
            onClick={() => setActiveTab('share')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'share' ? 'text-white' : 'text-gray-500'}`}
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
                <div className='flex flex-col ap-3'>
                  <div className=' flex-col flex gap-3'>
                  <h2 className='text-3xl text-white font-bold '>{tvShow.name}</h2>
                  <p className='text-white text-sm'>Rating: {tvShow.vote_average}</p>
                  <p className='text-white text-sm'>{tvShow.overview}</p>
                    </div>
                 <div className='flex gap-4 mt-3'>
                  <Button
                 className={"hide-rounded-lg bg-[#e30a13] hover:bg-slate-100 text-sm"}
                  icon={<FaList/>}
                  />
                  <Button
                  icon={<FaHeart/>}
                  className={"rounded-full bg-[#e30a13] hover:bg-slate-100 text-xs"}
                  />
                  </div>
                </div>
              </div>
           
            </div>
          )}
          <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
      <div className="flex flex-col mt-4">
      {activeTab === 'overview' && (
         <div>
         {/* <Personal/> */}
          </div>
        )};
        {activeTab === 'media' && media.length > 0 && (
          <div>
            <p className="text-white mt-4">Media:</p>
            <ul className="grid grid-cols-4 gap-4 ">
              {media.map((image, index) => (
                <li key={index}>
                  <div className='max-w-sm rounded bg-gray-900 p-1 overflow-hidden shadow-lg'>
                  <img
                    src={`${IMAGE_BASE_URL}${image.file_path}`}
                    alt="Media"
                    className="flex w-full h-96 object-cover cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                  <div className="p-2">
                <h2 className="text-white text-lg">{image.title}</h2>
                <p className="text-gray-400">{image.release_date}</p>
                <p className="text-white text-sm">Rating: {image.vote_average}</p>
              </div>
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
