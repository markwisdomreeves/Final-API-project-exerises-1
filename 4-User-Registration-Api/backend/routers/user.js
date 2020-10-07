const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');


const router = express.Router();


router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
})


router.post('/users/login', async (req, res) => {
    // Login a registered user
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: "This account does not exist" })
        }
        const token = await user.generateAuthToken();
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})


// Get a user profile
router.get('/users/me', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})


// Logout the user from on one device
router.post('/users/me/logout', auth, async (req, res) => {
    // Logout user from the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})


// Logout user from all devices
router.post('/users/me/logout-all', auth, async (req, res) => {
    // Logout user from all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }

})


module.exports = router;