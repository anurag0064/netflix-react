import React, { useEffect, useState } from 'react';
import { IMAGE_BASE_URL } from '../../../../../config/constants';
import { fetchMedia1 } from '../../../../../services/media.service';

const MediaList = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      const fetchedMedia = await fetchMedia();
      setMedia(fetchedMedia);
    };

    getMedia();
  }, []);

  const handleImageClick = (image) => {
    console.log('Image clicked:', image);
  };

  return (
    <div>
      <p className="text-white mt-4">Media:</p>
      <ul className="grid grid-cols-4 gap-4">
        {media.map((image, index) => (
          <li key={index}>
            <div className="max-w-sm rounded bg-gray-800 p-1 overflow-hidden shadow-lg">
              <img
                src={`${IMAGE_BASE_URL}${image.poster_path}`}
                alt={image.title}
                className="flex w-full h-auto object-cover cursor-pointer"
                onClick={() => handleImageClick(image)}
              />
              <div className="p-2">
                <h2 className="text-white text-lg">{image.title}</h2>
                <p className="text-gray-400">{image.release_date}</p>
                <p className="text-gray-400">Rating: {image.vote_average}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaList;
