const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schools_courses_Schema = new Schema({
  School: {
    type: String,
    required: true,
    trim: true,
  },
  Course: {
    type: String,
    required: true,
    trim: true,
  },
  Duration: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Schools_Course = mongoose.model("Schools_Course", schools_courses_Schema);
module.exports = Schools_Course;