const { json } = require("express");
const express = require("express");
var cors = require('cors')
const mongoose = require("mongoose");
const userRouter = require('./routes/userRouter.js');
const path = require("path")

//initialization app
const app = express();
require("dotenv").config();

// middleware 
app.use(express.json());
app.use(cors());


//connection
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL, (err, client) => {
  if (err) {
    console.log("err");
    console.log(err);
  } else {
    console.log("Connection Established !!");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  }
});


  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../Frontend", "build", "index.html"))
  )

//routes
app.use("/admin/v1/user",userRouter)

