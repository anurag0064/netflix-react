import React from 'react';

const Modal = ({ isOpen, onClose, movie }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
        <p className="mb-4">{movie.description}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
