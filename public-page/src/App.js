import './App.css';
import Sidebar from './components/Sidebar.js'

import Logo from './assets/logo.png'
import Name from './assets/logo-name.png'




function App() {
  

  return (
    <div className = "main">
       <Sidebar/>
      <div className = "nav">
        <img className = "logo" src = {Logo} alt = "Nirvana Collections logo"></img>
        <img className = "name" src = {Name} alt = "Nirvana Collections"></img>
      </div>

    </div>
    
  );
}

export default App;