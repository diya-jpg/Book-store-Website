//import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loading";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {useSelector} from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails= () => {
  const {id}=useParams();
  console.log(id);
  const[Data,setData]=useState();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const role=useSelector((state)=>state.auth.role);
  
  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
     console.log(response);
      setData(response.data.data);
    };
    fetch();
  },[]);
  const Headers={
    id:localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }
  const HandleFavourite=async()=>{
    

    const response=await axios.put("http://localhost:1000/api/v1/add-book-to-favourite",{ bookid: id, id: localStorage.getItem("id")},{headers:Headers});
    alert(response.data.message);
    
  };
  const HandleCart=async()=>{
    

    const response=await axios.put("http://localhost:1000/api/v1/add-book-to-cart",{ bookid: id, id: localStorage.getItem("id")},{headers:Headers});
    alert(response.data.message);
    
  };
  return (
   <>
   {Data && (
     <div className=" px-4 md:px-12 py-8 bg-zinc-900 flex  flex-col lg:flex-row md:flex-row  gap-8">
     <div className="  w-full lg:w-3/6 ">
     <div className="flex flex-col lg:flex-row justify-around bg-zinc-800  p-12 rounded ">
     <img src={Data.url} alt="/" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"/>
     {isLoggedIn===true && role ==="user" &&(
      <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start ml-5 mt-4 lg:mt-0">
      <button className="bg-white  rounded lg:rounded-full text-2xl p-2 text-red-500 flex items-center justify-center" onClick={HandleFavourite}>
      <FaHeart /><span className="ms-4 block lg:hidden">Favourites</span>
      </button>
      <button className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-2xl p-2   lg:mt-8 bg-blue-500 flex items-center justify-center"onClick={HandleCart}>    <FaShoppingCart /><span className="ms-4 block lg:hidden"  >Add To Cart</span>

      </button>
     </div>
     )}
      {isLoggedIn===true && role ==="admin" &&(
      <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start ml-5 mt-4 lg:mt-0">
      <button className="bg-white  rounded lg:rounded-full text-2xl p-2 text-red-500 flex items-center justify-center "> {isLoggedIn===true && role ==="user" &&(
      <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start ml-5 mt-4 lg:mt-0">
      <button className="bg-white  rounded lg:rounded-full text-2xl p-2 text-red-500 flex items-center justify-center ">
      <FaEdit /><span className="ms-4 block lg:hidden">Edit</span>
      </button>
      <button className="text-red-500 rounded mt-8 md:mt-0 lg:rounded-full text-2xl p-2 lg:mt-8 bg-white-500 flex items-center justify-center">
      <MdDelete /><span className="ms-4 block lg:hidden">Delete</span>

      </button>
     </div>
     )}<span className="ms-4 block lg:hidden">Favourites</span>
      </button>
      <button className="text-white rounded lg:rounded-full text-2xl p-2  mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center">
      <FaShoppingCart /><span className="ms-4 block lg:hidden">Add To Cart</span>

      </button>
     </div>
     )}
     </div>
     </div>
     <div className="p-4 w-full  lg:w-3/6">
     <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
     <p className="text-zinc-400 mt-1">by {Data.author}</p>
     <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
     <p className="flex mt-4 items-center justify-start text-zinc-400">
       <GrLanguage className="me-3"/>{Data.language}
     </p>
     <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price : ₹{Data.price}{""}</p>
     </div>
   </div>
   )}
   {!Data && <div className="h-screen bg-zinc-900 flex items-center justify-center"><Loader/></div>}
   </>
  )
}

export default ViewBookDetails;
