import React from "react";
import { FaHome, FaTv, FaFilm, FaHeart, FaBell, FaUser, FaCog, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Sidebar() {

  const menuItems = [
    { label: "Home", icon: <FaHome />, to: "/" },
    { label: "TV Show", icon: <FaTv />, to: "/tvShow" },
    { label: "Movies", icon: <FaFilm />, to: "/movie" },
    { label: "My List", icon: <FaHeart />, to: "/myList" },
    { label: "Coming Soon", icon: <FaCalendarAlt />, to: "/comingSoon" },
    { label: "Notification", icon: <FaBell />, to: "/notification" },
  ];

  const generalItems = [
    { label: "Profile", icon: <FaUser />, to: "/profile" },
    { label: "Setting", icon: <FaCog />, to: "/setting" },
  ];

  return (
    <div className="relative top-0 bottom-0 left-0 w-60 h-screen bg-[#2d2d2d] text-gray-400 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center mt-4">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-64" />
          </Link>
        </div>
        <div className="text-gray-500 px-4 mb-2 mt-4">Menu</div>
        <nav className="mt-5 px-4">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.to} className="block">
              <div className="flex gap-5 hover:bg-gray-800 hover:text-red-600 text-gray-400 rounded-xl mb-2 px-4 py-2 items-center cursor-pointer">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="text-gray-500 px-4 mb-2 mt-4">General</div>
        <div className="mt-5 px-4">
          {generalItems.map((item) => (
            <Link key={item.label} to={item.to} className="block">
              <div className="flex gap-5 hover:bg-gray-800 hover:text-red-600 text-gray-400 rounded-xl mb-2 px-4 py-2 items-center cursor-pointer">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
