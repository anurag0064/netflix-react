import React from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import DefaultInput from './components/defaultInput/DefaultInput';
import Button from '../../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';


const Header = () => {
 
    const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/auth/login');
    }
  
  return (
    <header className="w-full h-20 bg-[#2d2d2d] py-4 px-4">
      <div className="mx-auto flex items-center justify-between">
        <nav className="flex flex-grow justify-between w-full">
          <div className="flex flex-1 justify-start items-center space-x-4 md:space-x-6">
            <div className='flex items-center gap-2 md:gap-6'>
              <MdArrowBackIosNew className='text-gray-800 bg-[#282828] text-xl' />
              <MdArrowForwardIos className='text-gray-800 bg-[#282828] text-xl' />
            </div>
            <DefaultInput className="flex-grow hidden md:block" />
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              text={'Sign In'}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2"
              type="submit"
              onClick={handleLoginClick}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Header;
