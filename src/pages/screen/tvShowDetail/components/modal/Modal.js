const ImageModal = ({ isOpen, image, onClose }) => (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
      <div className="bg-white p-4 rounded-lg z-10">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          &times;
        </button>
        <img src={image} alt="Full Size" className="max-w-full max-h-full" />
      </div>
    </div>
  );
  export default ImageModal;
  