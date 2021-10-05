const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');

// post job
router.post('/add', async(req,res)=>{
    try {
        const post = await new postModel(req.body);
        post.save((err,post)=>{
            if(post) {
                res.status(201).send({
                    post,
                    message:"Post added"
                })
            }
            else {
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
// get posts of user
router.get('/jobposts/:userId', async(req,res)=>{
    try {
        const userPosts = await postModel.find({userId: req.params.userId});
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json(error);
    }
});
// get all posts
router.get('/all', async(req,res)=>{
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});
// apply for job post
router.put('/apply/:postId', async(req,res)=>{
    try {
        const post = await postModel.findById(req.params.postId);
        if(!post.applicants.includes(req.body.userId)){
            await post.updateOne({$push:{applicants:req.body.userId}});
            res.status(200).json("Applied");
        }else {
            res.status(200).json("Applied already")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
