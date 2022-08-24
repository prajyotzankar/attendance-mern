const router = require("express").Router();
const Schools_course = require("../models/schools_course");
const checkAuth = require("../middleware/auth_middleware");

const authorizedUserTypes = ["faculty", "admin"];

router.route("/schools").get(async (req, res) => {
  const { auth, userType } =  await checkAuth(req);
  if (auth === "verified" && authorizedUserTypes.includes(userType)) {
    Schools_course.find({}, { School: 1, _id: 0 })
      .distinct("School")
      .then((schools) => res.json(schools))
      .catch((error) => res.status(400).json("Error: " + error));
  }
  else {
    res.status(403).json("Access Denied");
  }
});

router.route("/courses/:SchoolName").get(async (req, res) => {
  const { auth, userType } =  await checkAuth(req);
  if (auth === "verified" && authorizedUserTypes.includes(userType)) {
    Schools_course.find({ School: req.params.SchoolName }, { Course: 1, _id: 0 })
    .distinct("Course")
      .then((courses) => {
        if (!courses.length) {
          res.status(400).json("Courses not found");
        }
        else {
          res.json(courses);
        }
      })
    .catch((error) => res.status(400).json("Error " + error));
  }
  else {
    res.status(403).json("Access Denied");
  }
});

router.route("/duration/:SchoolName/:CourseName").get(async (req, res) => {
  const { auth, userType } =  await checkAuth(req);
  if (auth === "verified" && authorizedUserTypes.includes(userType)) {
    Schools_course.find({
      School: req.params.SchoolName,
      Course: req.params.CourseName,
    },
    { Duration: 1, _id: 0 }).then((duration) => {
        if (!duration.length) {
          res.status(400).json("Duration not found");
        }
        else {
          res.json(duration);
        }
      })
    .catch((error) => res.status(400).json("Error " + error));
  }
  else {
    res.status(403).json("Access Denied");
  }
});

module.exports = router;
