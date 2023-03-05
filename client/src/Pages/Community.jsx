import React, {useEffect, useState} from 'react'

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
  


  
  return (
    <div className='community-posts'>
    <ul>
      {posts.map((post) =>(
        <li>
        <h2>{post.prompt}</h2>
        <img src={post.imageUrl} alt={post.promt}></img>
        </li>
        
      ))}
    
    </ul>
    </div>
  )
}

export default Community