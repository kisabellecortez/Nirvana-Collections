import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';

import Home from './pages/Home'
import Shop from './pages/Shop'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import ContactUs from './pages/ContactUs'

function App() {

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="shop" element={<Shop/>}/>
          <Route path="faq" element={<FAQ/>}/>
          <Route path="blog" element={<Blog/>}/>
          <Route path="contactus" element={<ContactUs/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;