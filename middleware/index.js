var Campground = require("../models/campground.js"),
    Comment    = require("../models/comment.js");
    
var middleware = {};

// middleware to prevent unauthenticated access
middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
            return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

middleware.checkCampgroundOwnership = function(req, res, next){
    // if a user is logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back");
            }
            else{
                // does user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You do not have the permission to do that");
                    res.redirect("back");
                }
            }    
        });   
    }
    else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
};

middleware.checkCommentOwnership = function(req, res, next){
    // if a user is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                req.flash("error","Comment not found");
                res.redirect("back");
            }
            else{
                // does user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You do not have the permission to do that");
                    res.redirect("back");
                }
            }    
        });   
    }
    else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
};

module.exports = middleware;