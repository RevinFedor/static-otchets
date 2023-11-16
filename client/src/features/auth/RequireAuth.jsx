import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Requireauth = () => {
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    const location = useLocation()


  return user ? (
      <Outlet />
  ) : (
      <Navigate to="/login" state={{ form: location }} replace />
  );
}

export default Requireauth