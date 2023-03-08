import React from 'react'
import { logo } from '../assets'

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Community from './Community';
import {Link} from 'react-router-dom'
import Home from './Home';
import './Navbar.css'




const NavBar = () => {
  return (
    <BrowserRouter>

      <div className='navbar'  >
      <Link to='/' ><img className='logo' src={logo} alt="logo"></img></Link> 
         
      </div>

      
        <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/community/posts' element={<Community/>} />
        </Routes> 
        </main>
    
      
    

      
    </BrowserRouter>

  
  )
}

export default NavBar