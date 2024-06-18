import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthRoute() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AuthRoute