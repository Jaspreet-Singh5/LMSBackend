var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    faculyId : {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    courseName          : String,
    courseDesc          : String,
    courseClass         : String,
    courseClassSubType  : String,
    courseSem           : String,
    icon                : String
});

module.exports = mongoose.model("Course", courseSchema);
