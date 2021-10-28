const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Company Name must be Provided"],
    maxlength: 30,
    trim: true
  },
  position: {
    type: String,
    required: [true, "Position must be Provided"],
    maxlength: 100,
    trim: true
  },
  status: {
    type: String,
    enum: ["interview", "decline", "pending"],
    default: "pending"
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please Provided User"]
  }
}, {timestamps: true})

module.exports = mongoose.model("Job", jobSchema)