import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'

export default function ShoppingCart(){
    return(
        <div className="shopping-card">
            <Sidebar/>
            <TopNav/>
            <p>shopping cart</p>
        </div>
    )
}