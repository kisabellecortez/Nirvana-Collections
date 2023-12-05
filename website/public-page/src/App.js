import './App.css';
import Sidebar from './components/Sidebar.js'

import Logo from './assets/logo.png'
import Name from './assets/logo-name.png'
import Insta from './assets/instagram.svg'

import { MongoClient } from 'mongodb';


function App() {

  const mongoClient = new MongoClient(
    'mongodb+srv://kisabelle:20Kristina04@cluster0.x9kfe73.mongodb.net/nirvana-collections?retryWrites=true&w=majority'
  )

  const data = await mongoClient.db().collection('products').find({}).toArray(); 
  
  console.log('!!!', data);

  return (
    <div className = "main">
       <Sidebar/>
      <div className = "nav">
        <img className = "logo" src = {Logo} alt = "Nirvana Collections logo"></img>
        <img className = "name" src = {Name} alt = "Nirvana Collections"></img>
      </div>

      <div className = "cards">
        
      </div>

      <div className = "cards">
        
      </div>

      <div className = "cards">
        
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
            <a href = "/">Custom Orders</a>

        </div>
        <div className = "payments">

        </div>
        <div className = "socials">
          <a href = "https://www.instagram.com/nirvanacollectinc/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==">
            <img src = {Insta} alt = "Instagram logo"></img>
          </a>

        </div>

      </div>

    </div>
    
  );
}

export default App;