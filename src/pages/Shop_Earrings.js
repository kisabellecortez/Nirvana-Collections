import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'


export default function Shop_Earrings(){
    return(
        <div>
            <Sidebar/>
            <TopNav/>
            
            <div className="earrings">
                <div className = "pcard-section">

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