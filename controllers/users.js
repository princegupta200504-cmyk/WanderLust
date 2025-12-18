const User = require("../models/user");
//signup form
module.exports.renderSignupForm = (req,res) =>{
    res.render("users/signup.ejs");
};
//signup
module.exports.signup = async(req,res) =>{
    try{
    let{username,email,password} = req.body;
    const newUser= new User({email , username});
    const registeredUser = await User.register(newUser,password);
  console.log(registeredUser);
  req.login(registeredUser, (err)=>{
    if(err){
      return next(err);
    }
    req.flash("success" ,"Welcome  to wandelust!");
    res.redirect("/listings");
  });
    } catch(e){
      req.flash("error", e.message);
      res.redirect("/signup");
    }
};

// login get
module.exports.renderLoginForm = (req,res)=>{
  res.render("users/login.ejs");
};

// login post
module.exports.login =   async (req,res) =>{
       req.flash("success","Welcome to wanderlust! You are logged in!");
      let redirectUrl = res.locals.redirectUrl || "/listings";  //const let 
      res.redirect(redirectUrl );    
};
module.exports.logout =(req,res)=>{
  req.logout((err)=>{
   if(err){
    return next(err);
   }
   req.flash("success", "you are logged out!");
   res.redirect("/listings");
  })
};

