import React from 'react'
import { Link } from "react-router-dom";

import logo from '../assets/vite.svg';

const Header = () => {
  return (
    <header className='flex flex-row justify-between items-center bg-gray-800 text-gray-200'>
      <Link to='/' className='flex flex-row items-center'>
        <div className='p-4'>
          <img src={logo} alt="logo" width={120} height={120}/>
        </div>
        <h1 className='text-3xl text-cyan-50'>myapp_react3</h1>
      </Link>
      <nav>
        <ul className='px-8 flex flex-row gap-4'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/protected'>Protected</Link></li>
          <li><Link to='/welcome'>Welcome</Link></li>
        </ul>
      </nav>
      
    </header>
  )
}

export default Header