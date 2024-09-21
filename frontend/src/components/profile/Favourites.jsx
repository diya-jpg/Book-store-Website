//import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import  BookCard from "../BookCard/BookCard"
const Favourites = () => {
  const [favourites, setfavourites] = useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
//   useEffect(()=>{
//     const fetch=async()=>{
//       const response=await axios.get("http://localhost:1000/api/v1/get-favourite-books"),
//         {headers}
//   }; };
//   fetch();
//   },[]);
//   return (
//     <div>
//       <h1>Hello</h1>
//     </div>
//   )
// }

// export default Favourites;
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/get-book-from-favourite", { headers });
      setfavourites(response.data.data); // Handle the fetched data
    } catch (error) {
      console.error("Error fetching favourite books:", error);
    }
  };

  fetchData(); // Call the fetch function
}, []);

return (
  <div className="grid grid-cols-4">
   {favourites && favourites.map((items,i)=><div key={i}><BookCard data={items}/></div>)}
  </div>
);
};

export default Favourites;
