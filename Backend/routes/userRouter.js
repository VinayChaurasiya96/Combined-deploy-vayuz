const express = require('express');
const app = express();
const User = require('../schemas/userSchema.js');

//user router
const userRouter = express.Router();

// handle error
function handleError(err, res){
  if(Object.keys(err.errors).length > 1){
    var errors = {};
      for(let key in err.errors){
        errors[key] = err.errors[key].properties.message;
      }
      res.status(500).json(errors);
  }else{
    res.status(500).json({'error': err._message});
  }
}

//create user route
userRouter.route("/add").post(async (req,res)=>{
  let userData = new User(req.body);
  
  try{
    // hashing password | using bcrypt 
    let saveUser = await userData.save();
    res.json(saveUser);
  } 
  catch (err){
    handleError(err, res);
  }
 })

 //get all users route
userRouter.route("/allusers").get(async (req,res)=>{
 try{
  let allusers = await User.find();
  res.json(allusers);
 }
  catch(err){
  handleError(err, res);
 }
 })

  // get Single user route
  userRouter.route("/:id").get(async (req,res)=>{
    try{
      let userId = req.params.id;
      const singleUserData = await User.findById(userId)
      res.json(singleUserData)
    }
    catch(err){
      handleError(err, res)
    }
   })

 // update user route
 userRouter.route("/update/:id").put(async (req,res)=>{
  try{
    let userId = req.params.id;
    const updateData = await User.findByIdAndUpdate
    (userId,
      {...req.body},{new:true}
      )
  
    res.json({updateData})
  }
  catch(err){
    handleError(err, res)
  }

 })

 // delete user route
 userRouter.route("/delete/:id").delete(async (req,res)=>{
  try{
    let userId = req.params.id;
    const id = await User.findById(userId)
    await User.deleteOne({ _id: userId})
    res.json(userId)
  }
  catch(err){
   handleError(err, res)
  }
  })

module.exports = userRouter;