// Import modules
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const  {Configuration, OpenAIApi} = require('openai');
const { Post } = require('./mongodb/models/Post');
const mongoose = require('mongoose')
const connectDB = require('./mongodb/Connect');
const cloudinary = require('cloudinary').v2;

// const postroute = require('./postRoute')

// Create an instance of the express server
const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());


// Configuration 
// Configuration 
cloudinary.config({
  cloud_name: "dclst2xhs",
  api_key: "349949736498457",
  api_secret: "yeEUpgcTkMF59An1V5Ta03_2o7o"
});

//api configuration
const openaiConfig = new Configuration({
    apiKey:process.env.OPEN_AI_KEY
  })

const openai = new OpenAIApi(openaiConfig)

// app.use('/api/post', postRoute)

app.get('/', (req, res) => {
  res.send("Hello from server..!")
})

// Define a route that sends data
app.post("/", async (req, res) => {
    console.log(req.body)
    try {
      const { prompt } = req.body;
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url",
      });
      const imageUrl = response.data.data[0].url;
      res.json({imageUrl });
      console.log(imageUrl)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate image" });
    }
});


app.post('/api/post', async (req,res) => {
    try{
        const { prompt, imageUrl } = req.body;
        const photoUrl = await cloudinary.uploader.upload(imageUrl);
        console.log(Post)
        const newPost = await Post.create({
            prompt,
            imageUrl: photoUrl.secure_url,
        });
        res.status(201).json({ success: true, data: newPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            message: 'Unable to create a new post.' 
        });
    }
});

app.get('/api/post', async(req, res) => {
    try{
        const posts = await Post.find({});
        console.log(posts)
        res.status(200).json({success:true, data: posts});
    }catch(err){
        console.log(err)
        res
        .status(500)
        .json({ success: false, message: "Unable to get posts." });
  
    }
});

// Start the server
const port = 8000;
try{
    connectDB("mongodb+srv://admin-rohith121:test123@cluster0.qtpj3sm.mongodb.net/?retryWrites=true&w=majority");
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
} catch (err) {
    console.log(err);
}