import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'

export default function Blog(){
    return(
        <div className = "main">
            <Sidebar/>
            <TopNav/>
            <h1>Blog</h1>
            <EndBanner/>
        </div>
    )
}