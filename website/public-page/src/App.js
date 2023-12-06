import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import ContactUs from './pages/ContactUs'
import Sidebar from './components/Sidebar.js'

import EndBanner from './components/EndBanner.js'
import TopNav from './components/TopNav.js'

import Logo from './assets/logo.png'
import Name from './assets/logo-name.png'

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

/*
  return (
    <div className = "main">
       <Sidebar/>
      <div className = "nav">
        <img className = "logo" src = {Logo} alt = "Nirvana Collections logo"></img>
        <img className = "name" src = {Name} alt = "Nirvana Collections"></img>
      </div>


      <div className = "home-page">
        <div className = "new-arrivals">
        
        </div>

        <div className = "bestsellers">

        </div>

        <a className="about" href="/">
          <h1>Welcome to Nirvana Collections</h1>
          <p>Handmade crystal jewelry.</p>
          <p>Intentionally made, ethically sourced.</p>
        </a>

        <div className = "pcard-section">
          <h1>BESTSELLERS</h1>

          <div className="pcard">

          </div>
        </div>

        <div className="pcard-section">
          <h1>NEW ARRIVALS</h1>
        </div>

      </div>

        

      </div>

    </div>
    
  );
  */
}

export default App;