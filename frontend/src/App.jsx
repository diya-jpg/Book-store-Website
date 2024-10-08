//import React from 'react';
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {  Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { useDispatch,useSelector} from "react-redux";
import { authActions } from "./store/auth";
import ViewBookDetails from "./components/ViewDetails/viewBookDetails";

import { useEffect } from "react";
import Favourites from "./components/profile/favourites";
import UserOrderHistory from "./components/profile/UserorderHistory";
import Settings from "./components/profile/Settings";
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
localStorage.getItem("token")&&
localStorage.getItem("role")
    ){
      dispatch(authActions.login());
dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);
  return (
    <div>
      
      <Navbar/>
     <Routes>
   <Route exact path="/" element={<Home/>}/>
   <Route path="/all-books" element={<AllBooks/>}/>
   <Route path="/Signup" element={<SignUp/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/cart" element={<Cart/>}/>
   <Route path="/profile" element={<Profile/>}>
   <Route index path="/profile/favourites" element={<Favourites/>}/>
   <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
   <Route path="/profile/settings" element={<Settings/>}/>
   </Route>
   <Route path="/view-book-details/:id" element={<ViewBookDetails/>}/>
     </Routes>

<Footer/>
      
      
     
    </div>
  );
};

export default App
