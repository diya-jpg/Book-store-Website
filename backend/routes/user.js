const express = require("express");
const User = require("./../models/user");
const router = express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        if (username.length < 4) {
            return res.status(400).json({ message: "username length should be greater than 3" });
        }
        const existingUsername = await User.findOne({  username: username });
        if (existingUsername) {
            return res.status(400).json({ message:"username exists already"})
        }
        const existingemail = await User.findOne({ email: email});
        if (existingemail) {
            return res.status(400).json({ message:"username exists already"})
        }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password's length greater than 5" })

        }
        const hashPass=await bcrypt.hash(password,10);
        const newuser = new User({
            username,
         email,
            password:hashPass,
         address
        })

        await newuser.save();
        return res.status(200).json({ message: "Signup successfull" });
    }

    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" });
    }
});
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({username});
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

         await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims=[{name:existingUser.username},{role:existingUser.role},
                ];
                const token=jwt.sign({authClaims},"bookStore123",{
                    expiresIn:"30d",
                });
                res.status(200).json({ id:existingUser.id,role:existingUser.role,token:token });
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/get-user-information", authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const data=await User.findById(id).select("-password");
        return res.status(200).json(data);
            }
            catch{
                res.status(500).json({ message: "Internal server error" });
            }
        });

        router.put("/update-address", authenticateToken,async(req,res)=>{
            try{
                const {id}=req.headers;
                const {address}=req.body;
                await User.findByIdAndUpdate(id,{address:address});
                return res.status(200).json({message:"address updated successfully"});
                    }
                    catch{
                        res.status(500).json({ message: "Internal server error" });
                    }
                })
                
module.exports = router;




