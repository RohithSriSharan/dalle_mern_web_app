import React, { useState } from "react";
import { Link } from "react-router-dom";
import { preview } from "../assets";
import "./Home.css";
import Loader from "../components/Loader";
import FileSaver from "file-saver";
import { MdSend } from 'react-icons/md';
import { FaHourglassEnd } from 'react-icons/fa';

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

      const response = await fetch("http://localhost:8000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
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
        const response = await fetch("http://localhost:8000/api/post", {
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
    const downloadResponse = await fetch("http://localhost:8000/download", {
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
    <div className="home">
      <Link to="/community/posts">
        <button type="button" className="community-button">
          Community
        </button>
      </Link>

      <p>Transform your ideas into images with DALL-E's image generation</p>

      <div className="input-div ">
        
        <input
          type="text"
          required
          id="promptInput"
          name="promptInput"
          value={prompt}
          placeholder="A miniature city with people 3d rendered photo realistic"
          onChange={handlePromptChange}
        />
        <button type="button" className="text-button" onClick={handleGenerateImage}>
          {generatingImg ? "Generating...." : "Generate Image"}

        </button>
        <button type="button" className="icon-button" onClick={handleGenerateImage}>
          {generatingImg ? <FaHourglassEnd/>: <MdSend/>}
          
        </button>
      </div>

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
            <button className="share-button" onClick={handleShare}>
              Share to community
            </button>
            <button onClick={handledownloadImage} className="download-button">{downloading?"Downloading...": "Download Image"}</button>
            
          </div>
        )}
      </div>
      
      </div>
    </div>
  );
}

export default Home;
