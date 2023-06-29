const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware =require("../middlewares/authMiddleware");

//register a new user
router.post("/register", async (req, res) => {
    try {
        //check if user already exists
        const user = await User.findOne({ email: req.body.email });
       
        if (user) {
            return res.send({
                success: false,
                message: "Email already exists",
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //create a new user
        const newUser = new User(req.body);
        await newUser.save();
        return res.send({
            success: true,
            message: "User created Successfully ,please login",
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});


//login a user
router.post("/login", async (req, res) => {
    try {
        console.log("Login request received:", req.body);

        //Check if user exists
        const user = await User.findOne({ email:req.body.email });
      
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        //Check if password is correct
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password,
        );
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        }
        //create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d", });
        return res.send({
            success: true,
            message: "Login successful",
            data: token,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});
//get loggedInuser details
router.get("/get-logged-in-user", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.body.userIdFromToken);
      if (!user) {
        return res.send({
          success: false,
          message: "User does not exist",
        });
      }
      return res.send({
        success: true,
        message: "User details fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  });
  
module.exports = router;