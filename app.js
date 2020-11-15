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

// mongoose.connect(process.env.DATABASEURL);
// const db = config.get("mongoURI");
const db = "mongodb://JaspreetSingh:jaspreet1999@ds237832.mlab.com:37832/medicaps";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Mongodb connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

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

// Init Middlewares
app.use(express.json({ extended: false }));

// Routes
app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentRoute);
app.use(indexRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
