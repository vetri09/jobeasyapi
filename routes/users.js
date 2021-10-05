var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');

// get all users
router.get('/', async(req,res)=>{
  try {
    const users = await userModel.find();
    res.status(200).send({
      users,
      message:"All users"
    })
  } catch (error) {
    res.status(500).send(error);
  }
});
// get user
router.get('/:userId', async(req,res)=>{
  try {
    const user = await userModel.findById(req.params.userId);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).send({
      other,
      message:"User find"
    })
  } catch (error) {
    res.status(500).send(error);
  }
});
// get user using name
router.get('/profile/find', async(req, res) => {
    const username = req.query.username;
    console.log(username)
    try {
        const user = await userModel.findOne({username:username})
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).send({
            other,
            message:"User find"
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
