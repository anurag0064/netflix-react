import React from "react";
import { FaHome, FaTv, FaFilm, FaHeart, FaBell, FaUser, FaCog, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import logo from "../../../assets/images/logo.png";

function Sidebar() {

  const menuItems = [
    { label: "Home", icon: <FaHome />, href: "/" },
    { label: "TV Show", icon: <FaTv />, href: "/tvShow" },
    { label: "Movies", icon: <FaFilm />, href: "/movie" },
    { label: "My List", icon: <FaHeart />, href: "/myList" },
    { label: "Coming Soon", icon: <FaCalendarAlt />, href: "/comingSoon" },
    { label: "Notification", icon: <FaBell />, href: "/notification" },
  ];

  const generalItems = [
    { label: "Profile", icon: <FaUser />, href: "/profile" },
    { label: "Setting", icon: <FaCog />, href: "/setting" },
  ];

  return (
    <div className="relative top-0 bottom-0 left-0 w-60 h-screen bg-[#2d2d2d] text-gray-400 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center mt-4">
          <img src={logo} alt="Logo" className="w-64" />
        </div>
        <div className="text-gray-500 px-4 mb-2 mt-4">Menu</div>
        <nav className="mt-5 px-4">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} className="block">
              <div className="flex gap-5 hover:bg-gray-800 hover:text-red-600 text-gray-400 rounded-xl mb-2 px-4 py-2 items-center cursor-pointer">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </a>
          ))}
        </nav>
        <div className="text-gray-500 px-4 mb-2 mt-4">General</div>
        <div className="mt-5 px-4">
          {generalItems.map((item) => (
            <a key={item.label} href={item.href} className="block">
              <div className="flex gap-5 hover:bg-gray-800 hover:text-red-600 text-gray-400 rounded-xl mb-2 px-4 py-2 items-center cursor-pointer">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="px-4 py-2 mb-4">
        <button className="flex items-center w-full px-4 py-2 hover:bg-gray-800 text-gray-400 hover:text-red-600 rounded-xl">
          <FaSignOutAlt className="w-5 h-5 mr-3" />
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

