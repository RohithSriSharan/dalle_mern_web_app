import React, { useState } from "react";
import { Link } from "react-router-dom";
import { preview } from "../assets";
import "./Home.css";
import Loader from "../components/Loader";
import FileSaver from "file-saver";
import { MdSend } from 'react-icons/md';
import { FaHourglassEnd } from 'react-icons/fa';
import { motion } from 'framer-motion'


function Home() {
  const [generatingImg, setGeneratingImg] = useState(false);
  const [share, setShare] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [downloading, setDownloading] = useState(false)

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerateImage = async () => {
    try {
      setGeneratingImg(true);

      const response = await fetch("https://ada-52ha.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
       
      });
      console.log(prompt)
      const data = await response.json();
      setImageUrl(data.imageUrl);
      setGeneratingImg(false);
      setShare(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();

    if (prompt && imageUrl) {
      try {
        const response = await fetch("https://ada-52ha.onrender.com/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, imageUrl }),
        });

        await response.json();
        alert("Success");
      } catch (err) {
        alert(err);
      } finally {
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  const handledownloadImage = async(e) => {
    e.preventDefault();
    setDownloading(true);
    const downloadResponse = await fetch("https://ada-52ha.onrender.com/download", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });
    const cloudUrl = await downloadResponse.json();
    FileSaver.saveAs(cloudUrl.url, 'image.jpg');
    setDownloading(false);
  };
  

  return (
    <motion.div className="home"
    
    >
      
      <Link to="/community/posts">
        <motion.button
        initial={{ opacity: 0, y:-100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        type="button" className="community-button">
          Community
        </motion.button>
      </Link>

      <motion.p 
        initial={{ opacity: 0, x:-150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      >Transform your ideas into images with DALL-E's image generation</motion.p>

      <motion.div className="input-div ">
        
        <motion.input initial={{ opacity: 0, x:-100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
          type="text"
          required
          id="promptInput"
          name="promptInput"
          value={prompt}
          placeholder="A miniature city with people 3d rendered photo realistic"
          onChange={handlePromptChange}
        />
        <motion.button

        initial={{ opacity: 0, x:50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        
        type="button" className="text-button" onClick={handleGenerateImage}>
          {generatingImg ? "Generating...." : "Generate Image"}

        </motion.button>
        <motion.button
        initial={{ opacity: 0, x:50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        
        type="button" className="icon-button" onClick={handleGenerateImage}>
          {generatingImg ? <FaHourglassEnd/>: <MdSend/>}
          
        </motion.button>
      </motion.div>

      <div className="ai-image"></div>

      <div className="image-section">
      {imageUrl ? (
        <img className="ai-image" src={imageUrl} alt="Urlpreview" width="512" height="512"  />
      ) : (
        <img src={preview} alt="preview" style={{opacity: 0.1}}/>
      )}
      {generatingImg && (
        <div className="loader">
          <Loader />
        </div>
      )}

      <div className="bottom-buttons">
        {share && (
          <div className="share-download">
            <motion.button
            initial={{ opacity: 0, x:50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
            
            className="share-button" onClick={handleShare}>
              Share to community
            </motion.button>
            
            <motion.button
            
            initial={{ opacity: 0, x:-50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            onClick={handledownloadImage} className="download-button">{downloading?"Downloading...": "Download Image"}</motion.button>
            
          </div>
        )}
      </div>
      
      </div>
    </motion.div>
  );
}

export default Home;
