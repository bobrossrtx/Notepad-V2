/**
 * Express User router
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = express.Router();

router.get('/init', async (req, res) => {
    const token = req.query.token;
    let user = null;
    let response;

    try {
        const userData = jwt.verify(token, 'app')
        user = await User.findById(userData.userId);
    } catch (e) {
        response = null;
    }

    if (user) {
        response = user;
    }

    res.send({
        user: response
    });
});

router.post('/register', async (req, res) => {
    const user = await User.find({
        email: req.body.email
    });
    if (user._id) {
        return res.status(400).send({
            message: 'User with this email already exists'
        });
    }
    const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    })
    await newUser.save();
    return res.sendStatus(201);
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return res.status(400).send({
            message: 'User with this email does not exist'
        });
    }

    const passwordCorrect = user === null ? false :
        await bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.error(err)
                return
            };
            console.log(req.body.password, user.password, result);
            return result;
        });

    if (passwordCorrect !== true) {
        return res.status(401).send({
            message: "Invalid password, please try again"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, 'app');

    res.send({
        user,
        token
    });
});

module.exports = router;