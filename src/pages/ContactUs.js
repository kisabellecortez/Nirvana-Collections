import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'
import React, { useState } from 'react'

/* Material UI */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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

            <h1 className='header'>CONTACT US</h1>

            <div className="form">
                <form action="nirvanacollectionsinc@gmail.com" method="post" enctype="text/plain">
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '120ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <TextField
                        required
                        id="name"
                        label="NAME"
                        type="text" 
                        onChange={(e)=>setName(e.target.value)}
                        />

                        <TextField
                        required
                        id="email"
                        label="EMAIL"
                        type="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />

                        <TextField
                        required
                        id="message"
                        label="MESSAGE"
                        multiline
                        rows={8}
                        defaultValue="Default Value"
                        name="message" 
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        />
                    </Box>
                </form>
            </div>

            <Button onClick={handleSubmit} variant="contained" color="secondary" size="large">SEND</Button>

            <EndBanner/>
        </div>
    )
}