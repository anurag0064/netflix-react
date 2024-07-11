import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../../../../../config/constants';
import { Carousel } from '@material-tailwind/react';
import Reviews from '../reviews/Reviews';

const BilledCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
          
        );
        console.log("response ---",response)
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching the cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className="w-full h-[calc(100vh-5rem)] overflow-y-auto">
    <h2 className="text-2xl font-bold text-[#f44336] mb-4">Billed Cast</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {cast.slice(0, 12).map((actor) => (
        <div
          key={actor.cast_id}
          className="text-center bg-white  rounded shadow"
        >
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className="w-full h-56 mb-2 object-cover rounded"
          />
          <div className='flex flex-col gap-1'>
          <h3 className="text-sm font-medium text-black">{actor.name}</h3>
          <p className="text-xs text-gray-500">{actor.character}</p>
            </div>
        </div>
      ))}
    </div>
    <Reviews/>
  </div>  
  );
};

export default BilledCast;


// import React from 'react';
// import { Carousel } from "@material-tailwind/react";

// const BilledCast = () => {

//   return (
//     <div className="w-full h-[calc(100vh-5rem)] overflow-y-auto">
//       <h2 className="text-2xl font-bold text-[#f44336] mb-4">Billed Cast</h2>
//       <Carousel className="rounded-xl">
//       <img
//         src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
//         alt="image 1"
//         className="h-full w-full object-cover"
//       />
//       <img
//         src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
//         alt="image 2"
//         className="h-full w-full object-cover"
//       />
//       <img
//         src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//         alt="image 3"
//         className="h-full w-full object-cover"
//       />
//     </Carousel>
//     </div>
//   );
// };

// export default BilledCast;
