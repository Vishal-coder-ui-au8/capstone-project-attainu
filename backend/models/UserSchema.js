var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  empid: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  profileimg: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("User", UserSchema);
module.exports = mongoose.model("User");
