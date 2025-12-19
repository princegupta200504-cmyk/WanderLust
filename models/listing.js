const mongoose = require("mongoose"); // mongoose ko require kiya ha 
const Schema = mongoose.Schema;  //  mongoose.Schema ak object ha jo mongoDb collection ka structure (Schema) ko define krna ka liya use hota ha 
const Review = require("./review.js");  //review model ko require kiya ha


const listingSchema = new Schema({   // structure define kr rha ha collection ka 
    title:{
        type:String,
        required:true,
    },

    description:String,
    image :{
        filename:String,
        url:String,
         
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
      type :Schema.Types.ObjectId,
      ref:"User",
    },
});

//mongoose middleware to delete reviews when a listing is deleted
// jb ham listing delete kren gy to ussy related reviews ko ya delete kr daga
listingSchema.post("findOneAndDelete",async (listing) =>{
  if(listing) {
      await Review.deleteMany({_id: {$in:listing.reviews}});
  }
 
})

const Listing = mongoose.model("Listing" ,listingSchema); // ya line ek model create karti ha jisse data insert find update find delete kra skta ha

module.exports  = Listing;  // listing ko send kran ka liya dusri file ma export kiya ha 


