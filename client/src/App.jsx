import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo } from './assets'
import { Home, CreatePost } from './pages'
import { AiOutlineRobot } from 'react-icons/ai'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to='/' className='flex items-center'>
          <AiOutlineRobot className='text-2xl' />
          <h1 className='ml-1 text-2xl font-normal italic '>Pix</h1>
        </Link>
        {loggedIn ? <Link className='font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md' to='/create-post'>
          Create
        </Link> : (
          <Link className='font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md' to='/login'>
            Login
          </Link>
        )}
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App