const express = require('express');
const {addUser,getAllUsers,getSingleUser,updateUser,deleteUser} = require('../controllers/userControllers')

 
// @desc express router 
const userRouter = express.Router();
// app.use("/admin/v1/user",userRouter)

userRouter.route("/add").post(addUser)


userRouter.route("/allusers").get(getAllUsers)


userRouter.route("/:id").get(getSingleUser)


userRouter.route("/update/:id").put(updateUser)


userRouter.route("/delete/:id").delete(deleteUser)

module.exports = userRouter;