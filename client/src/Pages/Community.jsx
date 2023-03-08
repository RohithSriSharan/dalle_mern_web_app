import React, {useEffect, useState} from 'react'
import FileSaver from 'file-saver'
import { IoMdDownload } from 'react-icons/io';

import './Community.css'
const Community = () => {
  const[posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () =>{
      try{
        const response = await fetch('http://localhost:8000/api/post');
        const data = await response.json();
        setPosts(data.data);

      }catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);
  
  const handlDownload = (url, text) =>{
    FileSaver.saveAs(url, `${text}.png`)
  }


  
  return (
    <div className='community-posts '>
    <ul className=' ' >
      {posts.map((post) =>(
        <li >
          
          <img src={post.imageUrl} alt={post.promt} className='' ></img>
          
          <div className='card-info'>
            <h2 >{post.prompt} </h2> 
            <button  className='image-download' onClick={() => handlDownload(post.imageUrl, post._id)}><IoMdDownload/></button>
          </div>
        
        
        </li>
        
      ))}
    
    </ul>
    </div>
  )
}

export default Community