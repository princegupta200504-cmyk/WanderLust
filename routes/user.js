const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");


//combine signup route
router.route("/signup")
    .get( userController.renderSignupForm)
    .post( wrapAsync(userController.signup));


// combine login route
// router.route("/login")
//   .get(userController.renderLoginForm)
//   .post(saveRedirectUrl ,
//   passport.authenticate("local", { 
//     failureRedirect: '/login', failureFlash: true }),
//     userController.login
//   );

// Update
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
 async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userRecord = await User.findOne({ username });   // or { email: username }

    if (!userRecord) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    // if using passport-local-mongoose:
    const authResult = await userRecord.authenticate(password);
    if (!authResult.user) {
      req.flash("error", "Incorrect password");
      return res.redirect("/login");
    }

    req.login(authResult.user, (err) => {
      if (err) return next(err);
      return res.redirect("/listings");
    });
  } catch (err) {
    return next(err);
  }
});
 



router.get("/logout", userController.logout)


module.exports = router;

