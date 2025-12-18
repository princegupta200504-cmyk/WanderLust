const mongoose = require("mongoose");
const initData = require("./data.js"); 
const Listing = require("../models/listing.js");


const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";

main()               // call mongoose function
  .then(() =>{
  console.log("connected to DB")
}).catch(err => console.log(err));

async function main(){             // connection make with mongo db
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj,owner :"693f9059e1f1dd2cb3d67803"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
