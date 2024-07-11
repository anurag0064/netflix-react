import React from 'react';
import ReactPlayer from 'react-player';
import { MdClose } from "react-icons/md";
import Button from '../../../../../components/buttons/Button';

const VideoModal = ({ isOpen, videoUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative w-full max-w-4xl p-4 bg-black h-5/6 rounded-lg">
        <Button
         className="absolute top-2 right-2 text-white text-2xl"
          onClick={onClose}
          icon={<MdClose/>}
          />
        <ReactPlayer url={videoUrl} playing controls width="100%" height="100%" />
      </div>
    </div>
  );
};
export default VideoModal;
