// const express = require('express');
// const { v2  } = require('cloudinary');
// const dotenv = require('dotenv')
// const Post = require('./mongodb/models');
// const { models } = require('mongoose');
// const cloudinary = require('cloudinary').v2;
// const app = express()


// // Configuration 
// cloudinary.config({
//     cloud_name: "dclst2xhs",
//     api_key: "349949736498457",
//     api_secret: "yeEUpgcTkMF59An1V5Ta03_2o7o"
//   });




//   app.post('/', async(req, res) => {
//     try{
//         const {prompt, imageUrl} = req.body;
//         console.log(prompt,imageUrl )

//         const newPost =await Post.create({
//             prompt,
//             imageUrl
//         });
//         res.status(200).json({success:true, data:newPost})
//     }catch (err){
//         console.log(err)
//         res.status(500).json({success: false, message: 'Unable to create a post, please try again'})
//     }
//   });

//   models.export = postroute;