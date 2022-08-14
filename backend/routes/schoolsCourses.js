const router = require("express").Router();
const Schools_course = require("../models/schools_course");

router.route("/schools").get((req, res) => {
  Schools_course.find({}, { School: 1, _id: 0 })
    .distinct("School")
    .then((schools) => res.json(schools))
    .catch((error) => res.json(400).json("Error: " + error));
});

router.route("/courses/:SchoolName").get((req, res) => {
  Schools_course.find({ School: req.params.SchoolName }, { Course: 1, _id: 0 })
    .distinct("Course")
    .then((courses) => res.json(courses))
    .catch((error) => res.status(400).json("Error " + error));
});

router.route("/duration/:SchoolName/:CourseName").get((req, res) => {
  Schools_course.find(
    {
      School: req.params.SchoolName,
      Course: req.params.CourseName,
    },
    { Duration: 1, _id: 0 }
  )
    .then((duration) => res.json(duration))
    .catch((error) => res.status(400).json("Error " + error));
});

module.exports = router;
