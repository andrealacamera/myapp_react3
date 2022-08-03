import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from './useAuth';

// import auth hook (to be defined)
const Guard = () => {
  const auth = useAuth();
  console.log(auth)
  return auth.user ? ( <Outlet /> ) : ( <Navigate to='/login' /> )
}

export default Guard