const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const{isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });

// combine index and post route 
router
   .route("/")
   .get( wrapAsync(listingController.index))
//    .post(
// isLoggedIn,validateListing, 
//     wrapAsync (listingController.createListing));  
   .post(upload.single('listing[image]'),(req,res) =>{
     res.send(req.file);
   });
    
    
// New Route
router.get("/new" , isLoggedIn, listingController.renderNewForm);

// combine show and update and delete route
router
     .route("/:id")
     .get( wrapAsync (listingController.showListing))
     .put( validateListing ,  isLoggedIn, isOwner, wrapAsync(listingController.updateListing))
     .delete( isLoggedIn, isOwner,wrapAsync( listingController.destroyListing));



// Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;