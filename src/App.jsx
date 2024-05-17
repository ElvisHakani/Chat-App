import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='main-app'>
      <Outlet />
    </div>
  )
}

export default App
