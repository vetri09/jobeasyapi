require('dotenv').config();
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// user register
router.post('/signup', async(req,res)=>{
    try {
        const list = await new userModel(req.body);
        list.save((err,user)=>{
            if(user) {
                res.status(201).send({
                    list,
                    message:"User added"
                })
            }
            else {
                if(err.code && err.code == 11000) {
                    console.log(Object.keys(err.keyValue).toString());
                    const field = Object.keys(err.keyValue).toString();
                    const code = 409;
                    const error = `An account with that ${field} already exists.`;
                    res.status(code).send({messages: error, fields: field});
                }
                if(err.name === 'ValidationError') {
                    let errors = Object.values(err.errors).map(el => el.message);
                    let fields = Object.values(err.errors).map(el => el.path);
                    let code = 400;
                    if(errors.length > 1) {
                        const formattedErrors = errors.join(' ');
                        res.status(code).send({messages: formattedErrors, fields: fields});
                    } else {
                        res.status(code).send({messages: errors, fields: fields})
                    }
                }
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
});
// user login
router.post('/login', async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email:email});
        if(!user) {
            res.status(401).json({messages:"This email does not exist"})
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            res.status(403).json({messages:"Invalid password"})
        }
        const token = jwt.sign(
            {
                email: email,
                userId: user._id
            },
            process.env.JWT_SECRET,
            {expiresIn: "1hr"},
        )
        res.status(200).json({
            token: token,
            user,
            messages:"Login success"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
