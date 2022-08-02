const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const city_district_pincode_stateSchema = new Schema({
  CityTown: {
    type: String,
    required: true,
    trim: true,
  },
  Pincode: {
    type: String,
    required: true,
    trim: true,
  },
  District: {
    type: String,
    required: true,
    trim: true,
  },
  StateName: {
    type: String,
    required: true,
    trim: true,
  },
});


const City_district_pincode_state = mongoose.model("City_district_pincode_state", city_district_pincode_stateSchema);
module.exports = City_district_pincode_state;