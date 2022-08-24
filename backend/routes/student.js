const router = require("express").Router();
const Student = require("../models/student.model");

router.route("/").get((req, res) => {
  Student.find()
    .then((student) => res.json(student))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.route("/admit").post((req, res) => {
  const name = req.body.name;
  const prn = req.body.prn;
  const birthDate = Date.parse(req.body.birthDate);

  const course = req.body.course;
  const address = req.body.address;

  const newStudent = new Student({
    name: name,
    prn: prn,
    birthDate: birthDate,
    course: course,
    address: address,
  });

  newStudent
    .save()
    .then(() => res.json("Student admitted..."))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.route("/studentByPRN/:prn").get((req, res) => {
  Student.findOne({ prn: req.params.prn })
    .then((student) => res.json(student))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.route("/filterByCourse/:SchoolName/:CourseName/:Year").get((req, res) => {
  Student.find(
    {
      "course.school": req.params.SchoolName,
      "course.courseName": req.params.CourseName,
      "course.year": req.params.Year,
    },
    { prn: 1, name: 1, birthDate: 1, _id: 0 }
  )
    .then((response) => res.json(response))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;
