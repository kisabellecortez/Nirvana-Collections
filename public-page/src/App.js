import './App.css';
import Sidebar from './components/Sidebar.js'

import Logo from './assets/logo.png'
import Name from './assets/logo-name.png'
import Open from './assets/menu.svg'
import Close from './assets/menu-x.svg'

function App() {
  return (
    <div className = "main">
      <div className = "nav">
        <img className = "menu-btn" src = {Open} alt = "open menu button"></img>
        <img className = "menu-btn" src = {Close} alt = "close menu button"></img>
        <img className = "logo" src = {Logo} alt = "Nirvana Collections logo"></img>
        <img className = "name" src = {Name} alt = "Nirvana Collections"></img>
      </div>
      <Sidebar/>

    </div>
    
  );
}

export default App;
