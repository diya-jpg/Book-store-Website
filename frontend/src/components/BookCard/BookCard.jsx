//import React from 'react'
import {Link} from "react-router-dom";
const BookCard = ({data}) => {
  return (
   <>
   <Link to={`/view-book-details/${data._id}`}>
   <div className= "bg-zinc-800 rounded p-4 flex flex-col">
<div className="bg-zinc-900 rounded flex items-center justify-center">
    <img src={data.url} alt="/" className="h-[35vh]"/>
</div>
<h2 className="mt-4 text-xl text-zinc-200">{data.title}</h2>
<h1>by {data.author}</h1>
<h2>Price: {data.price}</h2>
   </div>
   </Link></>
  )
}

export default BookCard
