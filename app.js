var campgroundRoute  = require("./routes/campground"),
    methodOverride   = require("method-override"),
    commentRoute     = require("./routes/comment"),
    indexRoute       = require("./routes/index"),
    LocalStrategy    = require("passport-local"),
    Campground       = require("./models/campground"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    express          = require("express"),
    Comment          = require("./models/comment"),
    seedDB           = require("./seed"),
    flash            = require("connect-flash"),
    User             = require("./models/user"),
    app              = express(),
    body             = require("body-parser");

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://JaspreetSingh:jaspreet1999@ds159707.mlab.com:59707/yelpcampgrounds");

// EXPRESS CONFIG
app.use(require("express-session")({
    secret: "musty is coming via a dragon from the hills",
    resave: false,
    saveUninitialized: false,
}));



// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
// middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// seed the database
//seedDB();

// APP CONFIG
app.use(body.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Routes
app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentRoute);
app.use(indexRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started.");
    }
);
