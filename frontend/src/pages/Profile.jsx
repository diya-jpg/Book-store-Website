//import React from 'react'

import { Outlet } from "react-router-dom";
import Loading from "../components/Loader/Loading";
//import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import Side from "../components/profile/Side";
const Profile= () => {
 // const isLoggedIn=useSelector();
  const [Profile,setProfile]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
    const fetchd=async()=>{
const response=await axios.get("http://localhost:1000/api/v1/get-user-information",{headers});
 console.log(response);
setProfile(response.data);
 };
    fetchd();
  },[]);
  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4">     
  {!Profile && <div className="w-full h-[100vh] flex items-center justify-center">
    <Loading/></div>}
  {Profile &&(
    <>
     <div className="w-full md:w-1/6">
    <Side data={Profile}/>
   </div>
   <div  className="w-full md:w-4/6">

    <Outlet/>
   </div>
    </>
  )}
    </div>
  )
}

export default Profile;
