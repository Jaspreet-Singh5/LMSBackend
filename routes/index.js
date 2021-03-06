const Course = require("../models/course");

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

// CREATE course
router.post("/api/admin/course", function(req, res){
    
    let courseName          = req.body.course.courseName;
    let courseDesc          = req.body.course.courseDesc;
    let courseClass         = req.body.course.courseClass;
    let courseClassSubType  = req.body.course.courseClassSubType;
    let courseSem           = req.body.course.courseSem;
    let icon                = req.body.course.icon;

    var newCourse = {
        faculyId            : {
            id: req.body.user_id
        },
        courseName          : courseName,
        courseDesc          : courseDesc,
        courseClass         : courseClass,
        courseClassSubType  : courseClassSubType,
        courseSem           : courseSem,
        icon                : icon
    };
     
    console.log(newCourse)

    Course.create(newCourse, function(err, newCourse){
        if(err)
        {
            console.log(err);
            res.send(err.message);
        }
        else
        {
            res.send("success");
        }    
    });
});

// get profile
router.get("/api/admin/user/:id", function(req, res){
    console.log(req.body)
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
            req.send(err.message);
        }
        else{
            res.send(foundUser)
        }
    });
});

// update profile
router.post("/api/admin/profile", function(req, res){
    console.log(req.body)
    User.findOneAndUpdate({_id: req.body.id}, req.body.user, function(err, updatedUser){
        if(err){
            console.log(err);
            res.send(err.message);
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
