import Arrow from '../assets/menu-dropdown.svg'
import '../index.css'
import {useState} from "react"

export default function SidebarItem(){
    const [open, setOpen] = useState(false)
    return(
        <div className = {open ? "sidebar-item open" : "sidebar-item"}>
            <div className = "sidebar-title">
                <span>
                    SHOP
                </span>
                <img className = "toggle-btn" src = {Arrow} alt = "dropdown arrow" onClick = {() => setOpen(!open)}></img>
            </div>
            <div className = "sidebar-content">
                Earrings
            </div>
        </div>
    )
}