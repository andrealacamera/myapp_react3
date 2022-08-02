import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';


// import auth hook (to be defined)
const Guard = () => {
  
  const auth = {
    user: "andrea"
  }

  return auth.user ? ( <Outlet /> ) : ( <Navigate to='/login' /> )
}

export default Guard