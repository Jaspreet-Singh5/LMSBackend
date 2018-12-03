var Campground = require("./models/campground"),
    mongoose   = require("mongoose"),
    Comment    = require("./models/comment");
    
var data = [
        {
            name: "Airstream",
            image: "https://farm4.staticflickr.com/3924/14422533026_9be7d49684.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis mauris vitae augue elementum efficitur. Pellentesque condimentum aliquam ligula eu bibendum. Phasellus suscipit diam ut nulla porta placerat. In vestibulum iaculis velit sed malesuada. In eu nisl iaculis, ultrices ante pulvinar, sagittis est. Morbi quis blandit magna. Ut malesuada aliquam justo ac tincidunt. Donec eu pulvinar purus. Donec lacus velit, rutrum blandit tortor a, iaculis scelerisque eros. Curabitur laoreet, nisl ac semper ultrices, mi purus tempus nulla, eu finibus nisl magna eget sapien. Vivamus scelerisque scelerisque tortor, at volutpat orci finibus pharetra. Donec aliquam bibendum erat, eu commodo mauris iaculis et. Maecenas sit amet magna lobortis, tincidunt justo eget, accumsan nunc. Duis a ultricies eros, placerat euismod orci. Nullam nec elit urna.",
        },
        
        {
            name: "Iceland tents",
            image: "https://farm3.staticflickr.com/2362/2386958382_6d6405271e.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis mauris vitae augue elementum efficitur. Pellentesque condimentum aliquam ligula eu bibendum. Phasellus suscipit diam ut nulla porta placerat. In vestibulum iaculis velit sed malesuada. In eu nisl iaculis, ultrices ante pulvinar, sagittis est. Morbi quis blandit magna. Ut malesuada aliquam justo ac tincidunt. Donec eu pulvinar purus. Donec lacus velit, rutrum blandit tortor a, iaculis scelerisque eros. Curabitur laoreet, nisl ac semper ultrices, mi purus tempus nulla, eu finibus nisl magna eget sapien. Vivamus scelerisque scelerisque tortor, at volutpat orci finibus pharetra. Donec aliquam bibendum erat, eu commodo mauris iaculis et. Maecenas sit amet magna lobortis, tincidunt justo eget, accumsan nunc. Duis a ultricies eros, placerat euismod orci. Nullam nec elit urna.",
        },
        
        {
            name: "Yellowstone national park",
            image: "https://farm4.staticflickr.com/3188/3061351079_e296bcd52b.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis mauris vitae augue elementum efficitur. Pellentesque condimentum aliquam ligula eu bibendum. Phasellus suscipit diam ut nulla porta placerat. In vestibulum iaculis velit sed malesuada. In eu nisl iaculis, ultrices ante pulvinar, sagittis est. Morbi quis blandit magna. Ut malesuada aliquam justo ac tincidunt. Donec eu pulvinar purus. Donec lacus velit, rutrum blandit tortor a, iaculis scelerisque eros. Curabitur laoreet, nisl ac semper ultrices, mi purus tempus nulla, eu finibus nisl magna eget sapien. Vivamus scelerisque scelerisque tortor, at volutpat orci finibus pharetra. Donec aliquam bibendum erat, eu commodo mauris iaculis et. Maecenas sit amet magna lobortis, tincidunt justo eget, accumsan nunc. Duis a ultricies eros, placerat euismod orci. Nullam nec elit urna.",
        },
    ];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("removed campgrounds!");
            
    //         Comment.remove({}, function(err) {
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed comments!");
    //         });
    //         // create a few campgrounds
    //         data.forEach(function(seed){
    //             Campground.create(seed, function(err, campground){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 console.log("added a new campground");
                    
    //                 //create a comment
    //                 Comment.create({
    //                     text: "What a wonderful campground",
    //                     author: "Martin",
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log(err);
    //                     }
    //                     else{
    //                         campground.comments.push(comment);
    //                         campground.save(function(err){
    //                             if(err){
    //                                 console.log(err);
    //                             }
    //                             else{
    //                                 console.log("created a new comment");
    //                             }
    //                         });
    //                     }
    //                 });
    //             }
    //         });
    //         });
    //     }
    });    
}    

module.exports = seedDB;
