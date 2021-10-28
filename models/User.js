const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field cannot be empty"],
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "Email field cannot be empty"],
    trim: true,
    minlength: 2,
    maxlength: 30,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password field cannot be empty"],
    minlength: 5,
    maxlength: 30,
  }
})

userSchema.pre("save", async  function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function() {
  return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async  function(candidatesPassword) {
 const isMatch = await bcrypt.compare(candidatesPassword, this.password) ;
 return isMatch;
}

module.exports = mongoose.model("User", userSchema);