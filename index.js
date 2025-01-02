const express=require('express');
const mongoose=require('mongoose');

const app=express();

//connecting db
mongoose.connect("mongodb://localhost:27017/rough").then(()=>{
    console.log("DB connected");
}).catch((error)=>{
    console.log("Error occured",error);
});

//creating endpoints


//creating port
app.listen(200,()=>{
    console.log("Server is running on port 200");
});