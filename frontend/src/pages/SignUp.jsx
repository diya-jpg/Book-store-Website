//import React from 'react'

import { useState } from "react"
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
const SignUp = () => {
  const [Values,setValues]=useState({name:"",email:"",password:"",address:""});
  const change=(e)=>{
    const{name,value}=e.target;
    setValues({...Values,[name]:value})
  };
  const navigate=useNavigate();
  const submit=async()=>{
    
    try{
if(Values.username===""|| Values.email===""|| Values.password===""|| Values.address===""){  
alert("All fields are required");
}
else{
const response=await axios.post("http://localhost:1000/api/v1/sign-up",Values);
console.log(response.data);

alert(response.data.message);
navigate("/login");
}
    }
    catch(error){
      alert(error.response.data.message);
    }
  };
  return (
  

    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
<p className="text-zinc-200 text-xl">Sign Up</p>
<div className="mt-4">

  <label htmlFor="" className="text-zinc-400">
    Username
  </label>
  <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder="username" 
  name="username" required value={Values.username}
  onChange={change}/></div>
<div>
  <label htmlFor="" className="text-zinc-400">
    Email
  </label>
  <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder="email"
   name="email" required value={Values.email}
  onChange={change}/>
</div>
<div>
  <label htmlFor="" className="text-zinc-400">
    Password
  </label>
  <input type="password" className="w-full mt-2 
  bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder="password" name="password" required value={Values.password}
  onChange={change}/>
</div>
<div>
  <label htmlFor="" className="text-zinc-400">
    Address
  </label>
  <textarea className="w-full h-[20vh] mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder="address"
   name="address" required value={Values.address}
  onChange={change}/> </div>
 <div className="mt-4">
  <button className="w-full  bg-blue-500 text-white font semi-bold py-2 rounded transform transition duration-300 hover:scale-110 "onClick={submit}>
    SignUp
  </button>
 </div>
 <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
  Or
 </p>
 <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
  Already have an account? &nbsp;
  <Link to="/login" className="hover:text-blue-500">
  <u>Login</u></Link>
 </p>
  
</div>
</div>
    
     
  )
}

export default SignUp
