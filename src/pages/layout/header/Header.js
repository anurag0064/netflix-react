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
    <header className="w-full h-20 bg-[#2d2d2d] py-4 px-4 relative">
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
              <form onSubmit={searchMovies}>
                <DefaultInput
                  placeholder="Enter the movie"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
              </form>
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
                <h3 className="text-xl font-bold">{movie.title}</h3>
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
