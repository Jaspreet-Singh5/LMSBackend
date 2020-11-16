var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    courseName          : String,
    courseDesc          : String,
    courseClass         : String,
    courseClassSubType  : String,
    courseSem           : String,
    icon                : String
});

module.exports = mongoose.model("Course", courseSchema);
