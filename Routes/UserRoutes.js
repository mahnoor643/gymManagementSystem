const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");
const router = express.Router();

//create user endpoint
router.post(
    "/signup",
    [
        body("username")
            .notEmpty()
            .isString()
            .isLength({ min: 5 })
            .withMessage("Username is required, atleast 5 characters long"),
        body("email")
            .notEmpty()
            .isEmail()
            .withMessage("Email should be valid"),
        body("password")
            .notEmpty()
            .isLength({ min: 8 })
            .withMessage("Password must be 8 characters long")
    ],
    async (req, res) => {
        //Validating input data
        const error =validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error});
        }
        try {
            const { username, email, password } = req.body;
            //checking if email already exist
            const alreadyExist = await User.findOne({ email });
            if (alreadyExist) {
                return res.status(409).json({
                    message: "User with this email already exists"
                })
            }
            //making random key pwd
            const salt = await bcrypt.genSalt(5);
            const hashedPassword = await bcrypt.hash(password, salt);
            //Adding data to DB
            const newUser = new User({
                username, email, password: hashedPassword
            });
            const savedUser = await newUser.save();
            //returning success response
            return res.status(201).json(savedUser);
        } catch (error) {
            //returning error
            return res.status(500).json({ error: error.message });
        }
    });


module.exports = router;