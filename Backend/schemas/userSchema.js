const mongoose = require("mongoose");

// users schema
const usersSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    status:{
      type: Boolean,
      default: true
    },
    level:{
      type: String,
      required: true
    }
  },{ timestamps: true });
  
  let User = new mongoose.model("User", usersSchema);
  module.exports = User;
