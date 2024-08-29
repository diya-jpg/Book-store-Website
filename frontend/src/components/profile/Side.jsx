//import React from 'react'
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
const Side = ({data}) => {
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center">
      <img src={data.avatar || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724198400&semt=ais_hybrid"} alt="User Avatar" className="h-[15vh]"/>
    <p className="mt-3 text-xl text-zinc-100 font-semibold">
        {data.username}
    </p>
    <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
    <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>
  <div className="w-full flex-col items-center justify-center hidden lg:flex">

  <Link to="/profile/favourites"
   className="text-zinc-100 font-semibold w-full py-2 text-center  hover:bg-zinc-900 rounded transition-all">
    Favourites</Link>  
    <Link to="/profile/orderHistory"
   className="text-zinc-100 font-semibold w-full py-2 text-center  hover:bg-zinc-900 rounded transition-all">
    Order History</Link>  
    <Link to="/profile/settings"
   className="text-zinc-100 font-semibold w-full py-2 text-center  hover:bg-zinc-900 rounded transition-all">
    Settings</Link>  
        </div>
        <button className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center">
        Logout  <IoIosArrowDroprightCircle />
            </button> </div>
  );
};

export default Side;
