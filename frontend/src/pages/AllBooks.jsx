//import React from 'react'
import Loader from "../components/Loader/Loading";
import BookCard from "../components/BookCard/BookCard";
import axios from "axios";
import { useEffect, useState } from "react";
const AllBooks = () => {
  const[Data,setData]=useState();
  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get("http://localhost:1000/api/v1/get-all-books");
     setData(response.data.data);
    }
    fetch();
  },[])
  return (
    <div className="bg-zinc-900  h-auto px-12 py-8">
       <h4 className="text-3xl text-yellow-100">Want to buy these books</h4>
    <div className="my-8 text-white  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
      {!Data && <div className="flex items-center justify-center my-8"><Loader/></div>}
      {Data && Data.map((items,i)=>(<div key={i}>
        <BookCard data={items}/>{ " "}
      </div>))}
    </div>
    </div>
  )
}

export default AllBooks
