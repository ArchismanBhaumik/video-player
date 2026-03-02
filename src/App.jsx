import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Video from './Video/Video'
import PageNotFound from './Components/PageNotFound'
import { useDebounce } from './hooks'
const App = () => {
  const [sideBar,setSidebar] = useState(false)
  const [search, setSearch] = useState('')
  let debouncedVal =  useDebounce(search,1000)
  useEffect(()=>{
    setSearch(debouncedVal);
    console.log("after debouncing:",search);
  },[debouncedVal])
  return (
    <div>
      <Navbar setSidebar={setSidebar} search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/'  element={<Home sidebar={sideBar} search={debouncedVal} />}/>
        <Route path='/video/:categoryId/:videoId'  element={<Video/>}/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App

/*vidtube-488914.   AIzaSyBWxeXFzSgJhuXRbGlskvCGHUJ7iQq3G_k*/