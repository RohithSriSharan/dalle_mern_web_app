// Import modules
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const  {Configuration, OpenAIApi} = require('openai');

// Create an instance of the express server
const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

//api configuration
const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_KEY
  })

  const openai = new OpenAIApi(configuration)

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

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
