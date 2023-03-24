import React, {useEffect, useState} from 'react'
import FileSaver from 'file-saver'
import { IoMdDownload } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';

import './Community.css'
const Community = () => {
  const[posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () =>{
      try{
        const response = await fetch('https://ada-52ha.onrender.com/api/post');
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
    <motion.div className='community-posts '>

    <ul className=' ' >
    <AnimatePresence>
      {posts.map((post) =>(
        <motion.li initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      
        transition={{ duration: 0.5 }}>
          
          <img src={post.imageUrl} alt={post.promt} className='' ></img>
          
          <div className='card-info'>
            <h2 >{post.prompt} </h2> 
            <button  className='image-download' onClick={() => handlDownload(post.imageUrl, post._id)}><IoMdDownload/></button>
          </div>
        
        
        </motion.li>
        
      ))}
      </AnimatePresence>
    </ul>
    </motion.div>
  )
}

export default Community