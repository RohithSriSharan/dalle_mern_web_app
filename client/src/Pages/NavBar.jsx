import React from 'react'
import { logo } from '../assets'
import '../components/NavBar.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Community from './Community';

import Home from './Home';





const NavBar = () => {
  return (
    <BrowserRouter>

      <div className='navbar'>
          <img className='logo' src={logo} alt="logo"></img>
         
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