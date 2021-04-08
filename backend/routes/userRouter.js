require("dotenv").config();

const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const { ObjectId } = require("mongodb");

const User = require("../models/UserSchema");

const secret = process.env.SECRET;

//Register a User
userRouter.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }

  let hashpassword = bcrypt.hashSync(password, 8);

  User.findOne({ email }, (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    else {
      User.create(
        {
          name,
          password: hashpassword,
          email: email,
          role: role ? role : "Admin",
          empid: `${(Math.random() * 100000).toFixed(0)}`,
          designation: "Administrator",
          profileimg: "https://i.ibb.co/dmJvCy6/default.png",
        },
        (err, user) => {
          if (err) return res.status(500).send("Error");
          res
            .status(200)
            .json({ success: true, message: "Registration Success" });
        }
      );
    }
  });
});

//Login for a user
userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).send("Bad Request");
  }

  User.findOne({ email }, (err, data) => {
    if (err || !data) {
      console.log("No User Found");
      return res.status(400).send({ auth: false, token: null, role: null });
    } else {
      console.log("User Found", data.name);
      const passIsValid = bcrypt.compareSync(password, data.password);
      if (!passIsValid) {
        console.log("Password Invalid");
        return res.status(400).send({ auth: false, token: null, role: null });
      }

      var token = jwt.sign({ id: data._id }, secret, { expiresIn: 86400 }); //24 hours

      //console.log("Login successful ", {user: data, auth:true, token:token})
      //return res.status(200).send({user: data, auth:true, token:token})
      console.log("Login successful ", {
        user: data.name,
        auth: true,
        token: token,
        role: data.role,
      });
      return res
        .status(200)
        .send({ user: data.name, auth: true, token: token, role: data.role });
    }
  });
});

userRouter.get("/detail", auth, (req, res) => {
  User.findOne({ _id: ObjectId(req.data.id.toString()) }, (err, user) => {
    if (err || !user) {
      console.log("No User Found ");
      return res
        .status(400)
        .send({ auth: true, token: "No User found", erroris: err });
    } else {
      console.log("User Found ", user.name);
      return res.status(200).send(user);
    }
  });
});

//show all users
userRouter.get("/list", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send("Error");
    res.status(200).send({ users });
  });
});

module.exports = userRouter;
