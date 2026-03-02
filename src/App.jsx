import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Video from './Video/Video'
import PageNotFound from './Components/PageNotFound'
const App = () => {
  const [sideBar,setSidebar] = useState(false)
  console.log(sideBar)
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/'  element={<Home sidebar={sideBar} />}/>
        <Route path='/video/:categoryId/:videoId'  element={<Video/>}/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App

/*vidtube-488914.   AIzaSyBWxeXFzSgJhuXRbGlskvCGHUJ7iQq3G_k*/