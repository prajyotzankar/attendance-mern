const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var validatePersonalEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var validateCollegeEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@(college.edu.in)+$/;
  return re.test(email);
};

const user_authSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["student", "faculty", "admin"],
    default: "student",
    required: true,
    trim: true,
  },
  userID: {
    type: Number,
    required: true,
    minlength: 10,
    trim: true,
    unique: true,
  },
  collegeEmailID: {
    type: String,
    minlength: 25,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateCollegeEmail, "Please fill a valid email address"],
    trim: true,
  },
  personalEmailID: {
    type: String,
    minlength: 12,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validatePersonalEmail, "Please fill a valid email address"],
    trim: true,
  },
  password: {
    type: String,
    minlength: 10,
    required: true,
    trim: true,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

user_authSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

user_authSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

user_authSchema.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id, userType: this.userType },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_KEY_EXPIRE }
  );
};

user_authSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken).digest("hex");
  
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
}

module.exports = mongoose.model("User_auth", user_authSchema);
