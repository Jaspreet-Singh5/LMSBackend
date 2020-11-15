var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    name : String,
    type : String,
    image: Image,
    phone: String, 
    aboutMe: String, 
    city: String, 
    country: String, 
    company: String,
    school: String, 
    hometown: String, 
    language: String, 
    gender: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);