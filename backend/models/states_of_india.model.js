const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const states_of_indiaSchema = new Schema({
  stateNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  stateName: {
    type: String,
    required: true,
    trim: true,
  },
});


const States_of_india = mongoose.model("States_of_india", states_of_indiaSchema);
module.exports = States_of_india;