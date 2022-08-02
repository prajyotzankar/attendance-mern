const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: {
        type: String,
        minlength: 5,
        trim: true 
    },
    city: {
        type: String,
        minlength: 4,
        trim: true,
        required: true
    },
    district: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    state: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    pinCode: {
        type: Number,
        required: true,
        trim: true,
        minlength: 6
    }
});

const courseSchema = new Schema({
    school: {
        type: String,
        required: true,
        trim: true,
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    }
});

const studentSchema = new Schema(
  {
    prn: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 10,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    birthDate: {
      type: Date,
      required: true,
      trim: true,
    },
    // gender blood group
    course: [courseSchema],
    address: [addressSchema],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema)
module.exports = Student;