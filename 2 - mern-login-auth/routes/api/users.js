
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require("passport");

// load input validation
const validateRegisterInput = require('../../Validator/Register');
const validateLoginInput = require('../../Validator/Login');

// Load User model
const User = require("../../models/User");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // const email = req.body.email;

    User.findOne({ email: req.body.email }).then(user => {
        /* If User already exists, show an error message to the user
        but if know user exists, create a new User account in the database*/
        if (user) {
            return res.status(400).json({
                email: "Email is already exists."
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Then Hash the User password before saving it in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });

});



// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // From validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ 
                emailNotFound: "Email not found" 
            });
        }

        // Check and compare password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // If the user password is matched, we will create a JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Then we Sign in the Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 31556926 }, // 1 year in seconds
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                  .status(400)
                  .json({ 
                      passwordIncorrect: "Password is incorrect" 
                });
            }
        });
    });

})



module.exports = router;