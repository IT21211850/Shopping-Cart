//import dependencies
const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require("mongoose");
const connectDB = require("./config/DBconfig");
const cors = require('cors');

//cart dependencies
const cartController = require('./controllers/cartController');
const indexController = require('./controllers/inventoryController');


//access env variables
env.config();


//connect to Database
connectDB();


//middleware
app.use(express.json());
app.use(cors());
app.use("/cart",cartController); 
app.use(express.urlencoded({ extended: true })); 

//route
app.get("/getInventory",indexController.getInvetory); 
app.get("/getItem/:id",indexController.getAProduct); 


app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})