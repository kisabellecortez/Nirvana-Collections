import Arrow from '../assets/menu-dropdown.svg'
import {useState} from "react"
import { UserAuth } from '../context/AuthContext.js'
import {useNavigate} from 'react-router-dom'

export default function SidebarItem({item}){
    const [open, setOpen] = useState(false)
    const { user, logOut } = UserAuth(); 
    const navigate = useNavigate()

    //signs out user
    const handleSignOut = async()=>{
        try{
            await logOut()
            navigate('/')
            console.log(user)
        }
        catch(error){
            console.log(error)
        }
    }

    if(item.childrens){
        return(
        <div className = {open ? "sidebar-item open" : "sidebar-item"}>
            <div className = "sidebar-title">
                <span>
                    {item.title}
                </span>
                <img className = "toggle-btn" src = {Arrow} alt = "dropdown arrow" onClick = {() => setOpen(!open)}></img>
            </div>
            <div className = "sidebar-content">
                {item.childrens.map((child, index) => <SidebarItem key = {index} item = {child}/>)}
            </div>
        </div>
    )
    }
    else if(item.title === "LOGOUT"){
        return(
            <a href = {item.path || '#'} className = "sidebar-item">
                <div className = "sidebar-title" onClick={(handleSignOut)}>
                    <span>
                        {item.title}
                    </span>
                </div>
            </a>
        )
    }
    else{
        return(
            <a href = {item.path || '#'} className = "sidebar-item">
                <div className = "sidebar-title">
                    <span>
                        {item.title}
                    </span>
                </div>
            </a>
        )
    }

}