import Logo from '../assets/logo.png'
import Name from '../assets/logo-name.png'

export default function TopNav(){
    return(
        <div className = "nav">
            <img className = "logo" src = {Logo} alt = "Nirvana Collections logo"></img>
            <img className = "name" src = {Name} alt = "Nirvana Collections"></img>
        </div>
        
    )
}