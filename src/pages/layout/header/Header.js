import React, { useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import DefaultInput from './components/defaultInput/DefaultInput';
import Button from '../../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from '../../../config/constants';

const Header = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const searchMovies = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching the movies", error);
    }
  };

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  return (
    <header className="w-full h-20 bg-[#2d2d2d] py-4 px-4">
      <div className="mx-auto flex items-center justify-between">
        <nav className="flex flex-grow justify-between w-full">
          <div className="flex flex-1 justify-start items-center space-x-4 md:space-x-6">
            <div className='flex items-center gap-2 md:gap-6'>
              <div className='flex'>
                <Button
                  icon={<MdArrowBackIosNew />}
                  className="text-gray-800 bg-[#282828] text-xl"
                  onClick={() => alert('Previous page')}
                />
              </div>
              <div className='flex'>
                <Button
                  icon={<MdArrowForwardIos />}
                  className="text-gray-800 bg-[#282828] text-xl"
                  onClick={() => alert('Next page')}
                />
              </div>
            </div>
            <div className="flex-grow hidden md:block">
              <DefaultInput
                placeholder="Enter the movie"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              text='Sign In'
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2"
              onClick={handleLoginClick}
            />
          </div>
        </nav>
      </div>
      {movies.length > 0 && (
        <div className="mt-4">
          <ul className="text-white">
            {movies.map(movie => (
              <li key={movie.id} className="mb-4">
                <h3>{movie.title}</h3>
                <p>Released: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <p>{movie.overview}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;


// import React, { useState } from 'react';
// import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
// import DefaultInput from './components/defaultInput/DefaultInput';
// import Button from '../../../components/buttons/Button';
// import { useNavigate } from 'react-router-dom';
// import SearchService from '../../../services/search.service';

// const Header = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/auth/login');
//   };

//   const handleSubmit = async (e) => {
//     const newQuery = e.target.value;
//     setQuery(newQuery);

//     if (newQuery.length > 2) {
//       const data = await SearchService.searchMovies(newQuery);
//       setResults(data);
//     } else {
//       setResults([]);
//     }
//   };

//   return (
//     <header className="w-full h-20 bg-[#2d2d2d] py-4 px-4 relative">
//       <div className="mx-auto flex items-center justify-between">
//         <nav className="flex flex-grow justify-between w-full">
//           <div className="flex flex-1 justify-start items-center space-x-4 md:space-x-6">
//             <div className="flex items-center gap-2 md:gap-6">
//               <Button
//                 icon={<MdArrowBackIosNew />}
//                 className="text-gray-800 bg-[#282828] text-xl"
//                 onClick={() => alert('Previous page')}
//               />
//               <Button
//                 icon={<MdArrowForwardIos />}
//                 className="text-gray-800 bg-[#282828] text-xl"
//                 onClick={() => alert('Next page')}
//               />
//             </div>
//             <div className="flex-grow hidden md:block">
//               <DefaultInput
//                 value={query}
//                 onChange={handleSubmit}
//                 placeholder="Search for a movie"
//                 className="w-full px-4 py-2 bg-[#3d3d3d] text-white rounded"
//               />
//             </div>
//           </div>
//           <Button
//             text="Sign In"
//             className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2"
//             type="button"
//             onClick={handleLoginClick}
//           />
//         </nav>
//       </div>
//       {results.length > 0 && (
//         <div className="absolute top-20 w-full bg-white text-black shadow-md">
//           {results.map((movie) => (
//             <div key={movie.id} className="p-4 border-b border-gray-300">
//               <h3 className="font-bold">{movie.title}</h3>
//               <p>{movie.overview}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
