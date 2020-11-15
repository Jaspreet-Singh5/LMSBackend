var passport = require("passport"),
    express  = require("express"),
    router   = express.Router(),
    flash    = require("connect-flash"),
    User     = require("../models/user");
    
// LANDING PAGE
router.get("/", function(req, res){
    res.render("landing.ejs");
});


// // register form
// router.get("/api/admin/register",function(req,res){
//     res.send("register");
// })

//sign up logic
router.post("/api/admin/register",function(req, res) {
   console.log('register post')

   var newUser = new User({username:req.body.email, name:req.body.name, type: req.body.type});
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           res.send(err)
       }
       res.send(user)
   });
});

// login form
router.get("/login",function(req, res){
    res.render("login");
});

// login logic
router.post("/api/admin/login",passport.authenticate("local"), function(req, res){
    res.send(req.user)
});

// logout logic
router.get("/logout",function(req, res){
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});


// update profile
router.post("/api/admin/profile", function(req, res){
    User.findOneAndUpdate(req.body.name, req.body.user, function(err, updatedUser){
        if(err){
            console.log(err);
            req.send(err.message);
        }
        else{
            res.send(updatedUser)
        }
    });
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
