const User = require("./../models/user");
const express = require("express");
const router = express.Router();
const {authenticateToken}=require("./userAuth");
router.put("/add-book-to-cart",authenticateToken,async(req,res)=>{
    try{
       const {bookid,id}=req.body;
      
const userData=await User.findById(id);

const isBookincart=userData.cart.includes(bookid);


    if(isBookincart){
        return res.status(200).json({message:"Book is already in cart"});
    }
    await User.findByIdAndUpdate(id,{ $push: { cart: [bookid] }});
    return res.status(200).json({
        status:"Success"
        ,message:"Book added to the cart"});
}
catch(error){
    console.log(error);
    res.status(500).send({message:"Internal server error"});
    
}
});
router.put("/delete-book-from-cart",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.body;
       
   const userData=await User.findById(id);
   console.log(userData)
   
   const isBookincart=userData.cart.includes((bookid));
   
   
   if(isBookincart){
      await User.findByIdAndUpdate(id,{ $pull: { favourites:[bookid] }});
   
   }
    
     return res.status(200).json({message:"Book removed from the cart"});
   }
   catch(error){
     console.log(error);
     res.status(500).send({message:"Internal server error"});
     
   }
  });
  router.get("/get-book-from-cart",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
       
   const userData=await User.findById(id).populate("cart");
  
   
   const Bookcart=userData.cart;
   
   
     
    
     return res.status(200).json({
       status:"Success",
       data:Bookcart
     });
   }
   catch(error){
     console.log(error);
     res.status(500).send({message:"Internal server error"});
     
   }
   });
module.exports=router;
