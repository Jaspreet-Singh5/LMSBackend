var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");
    
// INDEX
router.get("/", function(req,res){
    
    Campground.find({},
    function(err, allcampgrounds)
    {
        if(err)
        {
            console.log(err);
            req.flash("error",err.message);
        }
        else
        {
            res.render("campgrounds/index", {campgrounds : allcampgrounds});
        }
    }
);    
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    var newCampground = {name : name, price:price, image : image, description: desc, author: author};
    
    Campground.create(newCampground, function(err, newCampground){
        if(err)
        {
            console.log(err);
            req.flash("error",err.message);
        }
        else
        {
            console.log(newCampground);
            res.redirect("/campgrounds");
        }    
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW
router.get("/:id", function(req, res) {
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err)
      {
          console.log(err);
          req.flash("error",err.message);
      }
      else
      {
        res.render("campgrounds/show", {campground: foundCampground});    
      }
   });
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
                req.flash("error",err.message);
        }
        else
            res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campgrounds, function(err, updatedCampground){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            res.redirect("/");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;