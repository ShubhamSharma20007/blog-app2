require('dotenv').config({path:"./.env"})
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const app = express();
connectDB();

cors.apply({
    origin:[`http://localhost:${process.env.PORT}`],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/v1/api/users",userRoute)
app.use('/v1/api/posts',postRoute)




app.listen(process.env.PORT,()=>{
    console.log("Server is running on port "+process.env.PORT)
})




