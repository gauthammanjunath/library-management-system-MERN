const express = require("express");
const router = express.Router();
const user = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register a new user
router.post("/register", async (req, res) => {
    try {
        //check if user already exists
        const user = await UserActivation.findone({ email: req.body.email });
        if (user) {
            return res.send({
                success: false,
                message: "User already exists",
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = -await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //create a new user
        const newUser = new UserActivation(req, body);
        await newUser.save();
        return res.send({
            success: true,
            message: error.message
        })

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
        //Check if user exists
        const user = await UserActivation.findone({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "user does not exist",
            });
        }
        //Check if password is correct
        const validpassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        }
        //create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" });
        return res.send({
            success: true,
            message: "Login successful",
            data: token

        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });

    }
});
module.exports = router;