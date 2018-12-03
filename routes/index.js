var passport = require("passport"),
    express  = require("express"),
    router   = express.Router(),
    flash    = require("connect-flash"),
    User     = require("../models/user");
    
// LANDING PAGE
router.get("/", function(req, res){
    res.render("landing.ejs");
});


// register form
router.get("/register",function(req,res){
    res.render("register");
})

//sign up logic
router.post("/register",function(req, res) {
   var newUser = new User({username:req.body.username});
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           req.flash("error",err.message);
           
           return res.redirect("/register");
       }
       passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to YelpCamp "+user.username);
           res.redirect("/campgrounds");
       });
   });
});

// login form
router.get("/login",function(req, res){
    res.render("login");
});

// login logic
router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), function(req, res){
});

// logout logic
router.get("/logout",function(req, res){
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});

// middleware to prevent unauthenticated access
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
            console.log("yup");
            return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = router;
