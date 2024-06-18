import { IoSearchOutline } from "react-icons/io5";

const DefaultInput = () => {
  return (
    <div>
      <label htmlFor="default-search" className="text-sm font-medium sr-only text-gray-600">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
          <IoSearchOutline className="text-xl text-gray-600" />
        </div>
        <input
          type="search"
          className="border text-white w-96 bg-[#2d2d2d] border-gray-600 outline-none h-10 block pl-10 pr-3 text-sm rounded-lg
          focus:ring-0 ring-0"
          placeholder="Search"
        />
      </div>
    </div>
  );
};
export default DefaultInput;


