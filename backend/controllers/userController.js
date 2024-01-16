const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addUser: async (req, res) =>{
    const {username, password ,role} = req.body;
   
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        return res.status(422).json({ msg: "username already exist" });
      }
      const newUser = await new User({
        username: username,
        password: hashed,
        isAdmin: role === "admin",
      });
      await newUser.save();
      res.status(201).json({ msg: "success" });
    } catch (error) {
      res.status(500).json({ msg: error });
      return;
    }

  },
  editUser: async (req, res) =>{
    const {username ,role} = req.body;

    try {
      let userFind = await User.findOne({ _id: req.params.id });

      if (!userFind) {
        return res.status(422).json({ msg: "username already exist" });
      }
      userFind.username = username;
      userFind.isAdmin = role === "admin";
      await userFind.save();
      res.status(200).json({
        msg: "success",
        user: {
          username: username,
          isAdmin: role === "admin",
        },
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: err });
      return;
    }
 
   
  },
  
  //DELETE A USER
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
