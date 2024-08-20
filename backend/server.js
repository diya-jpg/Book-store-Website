const express=require("express");
const app=express();
require("dotenv").config({path:'./config/config.env'});
require("./conn/connection");
const cors=require("cors");
app.use(express.json());
const User=require("./routes/user");
const Books=require("./routes/book");
const Favourites=require("./routes/favourite");
const Cart=require("./routes/cart");
const Order=require("./routes/order");
app.use(cors());
app.use("/api/v1",User);
app.use("/api/v1",Books);
app.use("/api/v1",Favourites);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);
app.listen(process.env.PORT,()=>{
    console.log("Server started ")
})