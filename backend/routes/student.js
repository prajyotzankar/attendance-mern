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
  // const school = req.body.school;
  // const courseName = req.body.courseName;
  // const year = req.body.year;
  // const street = req.body.street;
  // const city = req.body.city;
  // const district = req.body.district;
  // const state = req.body.state;
  // const pinCode = req.body.pinCode;

  const course = req.body.course;
  const address = req.body.address;

  const newStudent = new Student({
    name: name,
    prn: prn,
    birthDate: birthDate,
    course: course,
    // [
    //   {
    //     school: school,
    //     courseName: courseName,
    //     year: year,
    //   },
    // ],
    address: address,
    // [
    //   {
    //     street: street,
    //     city: city,
    //     district: district,
    //     state: state,
    //     pinCode: pinCode,
    //   },
    // ],
  });

  newStudent
    .save()
    .then(() => res.json("Student admitted..."))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.route("/:prn").get((req, res) => {
  Student.findOne({ prn: req.params.prn })
    .then((student) => res.json(student))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;
