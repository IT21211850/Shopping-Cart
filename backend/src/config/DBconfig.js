//access env varibles
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const mongoose = require('mongoose');


//db connecting function
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connection is successful");

    }catch(err){
        console.log("Unsuccessful");
        console.log(err);

    }

}

module.exports = connectDB;
