import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'

export default function ContactUs(){
    return(
        <div className = "contact-us">
            <Sidebar/>
            <TopNav/>

            <div className="form">
                <h1>CONTACT US</h1>
                <div className="input">
                <label for="name">NAME: </label>
                <input type="text" id="name" name="name" required></input>
                </div>
                
                <div classname="input">
                <label for="name">EMAIL: </label>
                <input type="email" id="email" name="email" required></input>
                </div>
                
                <div className="input">
                <label for="name">MESSAGE: </label>
                <textarea id="message" name="message" required></textarea>
                </div>

                <button type="submit">SEND</button>
            </div>

            <EndBanner/>
        </div>
    )
}