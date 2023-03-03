import React, { useState, useEffect } from "react";

import { preview } from "./assets";
import './App.css'
import Loader from "./components/Loader";
function App() {
//Animation for  button
  const[generatingImg, setGeneratinImg] = useState(false);



  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("")

  const handlePromptChange = (event) =>{
    setPrompt(event.target.value);
  };

  // const handleClick = async() => {
  //   const response = await fetch("http://localhost:8000/");
  //   const jsonData = await response.json();
  //   setImageUrl(jsonData.data)
  // }


const handleGenerateImage = async () =>{
  try{
    setGeneratinImg(true);
   
    const response = await fetch("http://localhost:8000",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({prompt})
    });
    const data = await response.json();
    setImageUrl(data.imageUrl);
    setGeneratinImg(false);
   


  }catch(error){
    console.error(error);
  }
};


  return (
    <div className="prompt-div">
        <p>Transform your ideas into images with DALL-E's image generation</p>
   
      
      <div className="input-div">
      <input
      type="text"
      required
      id = "promptInput"
      name="promptInput"
      value={prompt}
      placeholder="A miniature city with people 3d rendered photo realistic"
      onChange={handlePromptChange}
    ></input>
    <button type="button" onClick={handleGenerateImage}>{generatingImg? "Generating....": "Generate Image"}</button>
      </div>
        
      {imageUrl ? (
        <img src={imageUrl} alt="Generated Image" width="512" height="512" />
      ):(
        <img src={preview}></img>
      )}{
        generatingImg && (<div className="loader"> <Loader/> </div>)
      }
      
    </div>
  );
}

export default App;
