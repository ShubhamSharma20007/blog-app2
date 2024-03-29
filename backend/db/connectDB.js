const mongoose = require('mongoose');


const connectionDb =async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Database connected successfully"))
    .catch((err)=>console.log("Error while connecting to the database "+err))
}

module.exports = connectionDb;