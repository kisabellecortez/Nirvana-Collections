import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'
import React, { useState } from 'react'

export default function ContactUs(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit =(event)=>{
        event.preventDefault(); // Prevent the form from submitting in the default manner

        // Construct the email body
        const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

        // Replace the email address below with the desired recipient email address
        const recipientEmail = 'Nirvanacollectionsinc@gmail.com';

        // Constructing the email link
        const mailtoLink = `mailto:${recipientEmail}?subject=Contact Form Submission&body=${encodeURIComponent(body)}`;

        // Open the mail client
        window.location.href = mailtoLink;
    }

    return(
        <div className = "contact-us">
            <Sidebar/>
            <TopNav/>

            <div className="form">
                <form action="mailto:kisabellecortez@gmail.com" method="post" enctype="text/plain">
                    <h1>CONTACT US</h1>
                    <div className="input">
                        <label for="name">NAME: </label>
                        <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        onChange={(e)=>setName(e.target.value)}
                        required></input>
                    </div>
                    
                    <div classname="input">
                        <label for="name">EMAIL: </label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required></input>
                    </div>
                    
                    <div className="input">
                        <label for="name">MESSAGE: </label>
                        <textarea 
                        id="message" 
                        name="message" 
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        required></textarea>
                    </div>

                    <button type="submit" onClick={handleSubmit}>SEND</button>
                </form>
            </div>

            <EndBanner/>
        </div>
    )
}