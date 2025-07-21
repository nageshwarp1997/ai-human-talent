import React from 'react'
import Navigation from './Navigation'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
