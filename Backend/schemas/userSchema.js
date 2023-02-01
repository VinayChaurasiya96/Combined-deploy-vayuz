const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

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
  
 

  // hashing password || middleware

  // usersSchema.pre('save', async(next)=>{
  //   if(this.isMoified('password')){
  //     this.password = bcrypt.hash(this.password,12);
  //   }
  //   next();
  // })

  let User = new mongoose.model("User", usersSchema);
  module.exports = User;
