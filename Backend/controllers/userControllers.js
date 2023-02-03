const User = require("../Models/userSchema.js");
const bcrypt = require("bcrypt");
const handleError = require("../common/handleError");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "USERSAPI";


/**
 * @desc Auth User & Get Token
 * @route GET /admin/v1/user/add
 * @access Public
 */
const addUser = async (req, res) => {
  let {username, email, password, status, level} = req.body;
  

  
  try {
      // validation 
    if(!username || !email || !password|| !status || !level  ){
      res.status(405).json("All fields are required")
    }
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
      console.log("user allready exist");
      return res.status(400).json({message: "User allready exist "});
    }
    
    await bcrypt.hash(password, 12).then((hashPassword) => {
      const userData = new User({
        username,
        email,
        password: hashPassword,
        status,
        level,
      });

     
      const token = jwt.sign(
        {email: userData.email, id: userData._id},
        SECRET_KEY
      );

     
      userData.save();
      res.status(202).json({user: userData, token: token});

    });

  } catch (err) {
    handleError(err, res);
  }
};

/**
 * @desc Get All User
 * @route GET /admin/v1/user/allusers
 * @access Public
 */

const getAllUsers = async (req, res) => {
  try {
    let allusers = await User.find();
    res.send(allusers);
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * @desc Get User By Id
 * @route GET /admin/v1/user/:id
 * @access Public
 */
const getSingleUser = async (req, res) => {
  try {
    let userId = req.params.id;
    const singleUserData = await User.findById(userId);
    res.send(singleUserData);
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * @desc  Update a User
 * @route PUT /admin/v1/user/update/:id
 * @access Public
 */
const updateUser = async (req, res) => {
  try {
    let userId = req.params.id;
    const updateData = await User.findByIdAndUpdate(
      userId,
      {...req.body},
      {new: true}
    );

    res.send({updateData});
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * @desc  Delete a User
 * @route PUT /admin/v1/user/delete/:id
 * @access Public
 */
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    const id = await User.findById(userId);
    await User.deleteOne({_id: userId});
    res.send(userId);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
