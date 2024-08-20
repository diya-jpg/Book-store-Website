const User = require("./../models/user");
const express = require("express");
const router = express.Router();




const {authenticateToken}=require("./userAuth");


router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{
    try{
       const {bookid,id}=req.body;
      
const userData=await User.findById(id);

const isBookFavourite=userData.favourites.includes(bookid);


    if(isBookFavourite){
        return res.status(200).json({message:"Book is already in favourites"});
    }
    await User.findByIdAndUpdate(id,{ $push: { favourites: [bookid] }});
    return res.status(200).json({message:"Book added to the favourites"});
}
catch(error){
    console.log(error);
    res.status(500).send({message:"Internal server error"});
    
}
});

router.put("/delete-book-from-favourite",authenticateToken,async(req,res)=>{
  try{
     const {bookid,id}=req.body;
    
const userData=await User.findById(id);
console.log(userData)

const isBookFavourite=userData.favourites.includes((bookid));


if(isBookFavourite){
   await User.findByIdAndUpdate(id,{ $pull: { favourites:[bookid] }});

}
 
  return res.status(200).json({message:"Book removed to the favourites"});
}
catch(error){
  console.log(error);
  res.status(500).send({message:"Internal server error"});
  
}
});

router.get("/get-book-from-favourite",authenticateToken,async(req,res)=>{
  try{
     const {id}=req.headers;
    
const userData=await User.findById(id).populate("favourites");

const BookFavourite=userData.favourites;


  
 
  return res.status(200).json({
    status:"Success",
    data:BookFavourite
  });
}
catch(error){
  console.log(error);
  res.status(500).send({message:"Internal server error"});
  
}
});
 module.exports = router;
