const router = require("express").Router();
const States_of_india = require("../models/states_of_india.model");
const City_district_pincode_state = require("../models/city_district_pincode_state.model");

router.route("/statesOfIndia").get((req, res) => {
  States_of_india.find({}, { stateName: 1, _id: 0 })
    .sort("stateName")
    .then((statesOfIndia) => res.json(statesOfIndia))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.route("/stateName/:nameOfState").get((req, res) => {
  City_district_pincode_state.find(
    { StateName: req.params.nameOfState },
    { District: 1, _id: 0 }
  )
    .distinct("District")
    .then((district) => res.json(district))
    .catch((error) => res.status(400).json("Error " + error));
});

router.route("/pincode/:pinCode").get((req, res) => {
  City_district_pincode_state.find({ Pincode: req.params.pinCode })
    .then((pinCodeInfo) => res.json(pinCodeInfo))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;
