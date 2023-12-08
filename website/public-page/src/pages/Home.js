import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'

export default function Home(){
    return(
        <div>
            <Sidebar/>
            <TopNav/>
            
            <div className="home">
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

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>
            </div>

            <div className="pcard-section">
                <h1>NEW ARRIVALS</h1>

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>
            </div>

            </div>

            <EndBanner/>
        </div>
    )
}