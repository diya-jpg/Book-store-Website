const express = require("express");
const User = require("./../models/user");
const router = express.Router();
const jwt=require("jsonwebtoken");
const Book=require("../models/book")

const {authenticateToken}=require("./userAuth");


router.post("/add-book",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
const user=await User.findById(id);
if(user.role!=="admin"){
    return res.status(40).json({message:"You have not having access to perform admin work"});
}
        const book=new Book({
        url:req.body.url,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        desc:req.body.desc,
        language:req.body.language
    });
    await book.save();
    console.log("Book saved successfully");
res.status(200).json({message:"Book added successfully"});


}
catch(error){
    console.log(error);
    res.status(400).send({message:"Error in adding book"});
}
});
router.put("/update-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
await Book.findByIdAndUpdate(bookid,{

       
        url:req.body.url,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        desc:req.body.desc,
       
        language:req.body.language
    });
    
return res.status(200).json({message:"Book updated successfully"});


}
catch(error){
    console.log(error);
   return  res.status(400).send({message:"Error in adding book"});
}
});

router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const{bookid}=req.headers;
        await Book.findByIdAndDelete(bookid);
return res.status(200).json({
    message:"Book deleted successfully"
});
    }
catch(error){
    console.log(error);
}
    }
);
router.get("/get-all-books",async(req,res)=>{
    try{
        const book=await Book.find().sort({createdAt:-1});
        return res.status(200).json({
            status:"Success",
            data:book,
        });
}
    
catch(error){
    console.log(error);
}
    }
);
router.get("/get-recent-books",async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1}).limit(4);
        return res.json({
            status:"Success",
            data:books,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
})
router.get("/get-book-by-id/:id",async(req,res)=>{
    try{
       const {id}=req.params;
       const book=await Book.findById(id);
       return res.json({
        status:"Success",
        data:book,
       });
}
    
catch(error){
    console.log(error);
}
    }
);
module.exports=router;
