import './App.css';
import Sidebar from './components/Sidebar.js'

import Logo from './assets/logo.png'
import Name from './assets/logo-name.png'
import Insta from './assets/instagram.png'
import Tiktok from './assets/tiktok.png'

import carousel from './assets/carousel-filler.jpg'

function App() {

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

      </div>

      <div className = "end-banner">
        <div className = "support">
          <h1>SUPPORT</h1>
            <a href = "/">Contact Us</a>
            <a href = "/">FAQs</a>
            <a href = "/">Jewelry Care</a>
            <a href = "/">Ring Size Guide</a>
        </div>
        <div className = "more">
          <h1>MORE</h1>
            <a href = "/">About</a>
            <a href = "/">Blog</a>
            <a href = "/">Custom Orders</a>

        </div>
        <div className = "payments">

        </div>
        <div className = "socials">
          <a href = "https://www.instagram.com/nirvanacollectinc/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==">
            <img className = "insta" src = {Insta} alt = "Instagram logo"></img>
          </a>
          <a href = "https://l.instagram.com/?u=https%3A%2F%2Fwww.tiktok.com%2F%40nirvanacollections%3F_t%3D8hv7gbADOT8%26_r%3D1&e=AT2TiNGlXAhKdyW5TV5zUk3pTd-c2Nk9lL5lf1bqopU5gaZJCpUOvTXflzOl8jjfhvznt-vYspB7vcpTpILLT4mV2vI8_gNR8xvu9kxoOC0Gbi-_WiZjzvW2fTmD-bOzldgkf_I">
            <img className = "tiktok" src = {Tiktok} alt = "Tiktok logo"></img>
          </a>

        </div>

      </div>

    </div>
    
  );
}

export default App;