
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { preview } from "../assets";
import './Home.css'
import Loader from "../components/Loader";

function Home() {
    //Animation for  button
      const[generatingImg, setGeneratinImg] = useState(false);
      const [share, setShare] = useState(false)
    
    
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
        setShare(true);
       
    
    
      }catch(error){
        console.error(error);
      }
    };
    
   
      return (
        <div className="prompt-div">
            <Link to='/community/posts'><button type="button" className="community">Community</button></Link>
            
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
            <img src={imageUrl} alt="Urlpreview" width="512" height="512" />
          ):(
            <img src={preview} alt="preview"></img>
          )}{
            generatingImg && (<div className="loader"> <Loader/> </div>)
          }
            {share&& 
                <div className="share-download">

                <button className="share-button">Share to community</button>
               
                
                
                </div>
            }
        </div>
      );
    }
    
    export default Home;
    