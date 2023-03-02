import React, { useState, useEffect } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("")

  const handlePromptChange = (event) =>{
    setPrompt(event.target.value);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:8000/");
  //     const jsonData = await response.json();
  //     setImageUrl(jsonData.data);
  //   }
  //   fetchData();
  // }, []);


  // const handleClick = async() => {
  //   const response = await fetch("http://localhost:8000/");
  //   const jsonData = await response.json();
  //   setImageUrl(jsonData.data)
  // }
const handleGenerateImage = async () =>{
  try{
    const response = await fetch("http://localhost:8000",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({prompt})
    });
    const data = await response.json();
    setImageUrl(data.imageUrl);
    console.log(data)


  }catch(error){
    console.error(error);
  }
};


  return (
    <div>
      <h1>Generated Image:</h1>
      {imageUrl && (
        <img src={imageUrl} alt="Generated Image" width="512" height="512" />
      )}
      <label htmlFor="promptInput">Enter Prompt:</label>
      <input
        type="text"
        id = "promptInput"
        name="promptInput"
        value={prompt}
        
        onChange={handlePromptChange}
      ></input>
      <button type="button" onClick={handleGenerateImage}>Generate Image</button>
    </div>
  );
}

export default App;
