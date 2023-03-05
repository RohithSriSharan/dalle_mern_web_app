import React, { useState } from "react";
import { Link } from "react-router-dom";
import { preview } from "../assets";
import "./Home.css";
import Loader from "../components/Loader";

function Home() {
  const [generatingImg, setGeneratingImg] = useState(false);
  const [share, setShare] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");

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

  return (
    <div className="prompt-div">
      <Link to="/community/posts">
        <button type="button" className="community">
          Community
        </button>
      </Link>

      <p>Transform your ideas into images with DALL-E's image generation</p>

      <div className="input-div">
        <input
          type="text"
          required
          id="promptInput"
          name="promptInput"
          value={prompt}
          placeholder="A miniature city with people 3d rendered photo realistic"
          onChange={handlePromptChange}
        />
        <button type="button" onClick={handleGenerateImage}>
          {generatingImg ? "Generating...." : "Generate Image"}
        </button>
      </div>

      {imageUrl ? (
        <img src={imageUrl} alt="Urlpreview" width="512" height="512" />
      ) : (
        <img src={preview} alt="preview" />
      )}
      {generatingImg && (
        <div className="loader">
          <Loader />
        </div>
      )}
      {share && (
        <div className="share-download">
          <button className="share-button" onClick={handleShare}>
            Share to community
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
