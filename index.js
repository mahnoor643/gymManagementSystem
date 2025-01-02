const express=require('express');
const mongoose=require('mongoose');
const UserRoutes=require("./Routes/UserRoutes");

const app=express();
app.use(express.json());

//connecting db
mongoose.connect("mongodb://localhost:27017/rough").then(()=>{
    console.log("DB connected");
}).catch((error)=>{
    console.log("Error occured",error);
});

//creating endpoints
app.get("/api", (req,res)=>{
    res.send("endpoint is working perfectly");
});

//Routes
app.use("/user",UserRoutes);

//creating port
app.listen(200,()=>{
    console.log("Server is running on port 200");
});