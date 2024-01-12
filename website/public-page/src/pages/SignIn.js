import { GoogleButton } from 'react-google-button';
import React, { useState } from 'react';  
import { UserAuth} from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'

const SignIn =()=>{
  const { googleSignIn } = UserAuth(); 
  const { signIn } = UserAuth(); 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  //sign in users using Google pop up 
  const handleGoogleSignIn = async(e)=>{
    e.preventDefault()
    try{
      await googleSignIn(); 
      navigate('/account')
    }

    catch(error){
      console.log(error);
    }
  }

  //sign in users using email and password
  const handleSignIn = async(e)=>{
    e.preventDefault()   
 
    try{
        await signIn(email, password)
        navigate('/home')
    }
    catch(userCredential){
        console.log("Invalid email or password.")

        return(
          alert("Email or password is incorrect.")
        )
    }
  
  }

    return(
      <div className="sign-in">
       
        <h1>Welcome back to Nirvana</h1>
        
        <div className="sign-in-card">
          <h1>Sign In</h1>
        <div className="google-button">
            <GoogleButton onClick={ handleGoogleSignIn }/>
        </div>

            <div className="form">
              <div className="input">
                  <label for="name">Email: </label>
                  <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="johndoe@google.ca"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required></input>
              </div>
              
              <div className="input">
                  <label for="name">Password: </label>
                  <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="abcd1234"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required></input>
              </div>
              <button type="submit"  onClick={ handleSignIn }>Sign In</button>
            </div>
            <p>Don't have an account? Sign up <a href="/signup">here.</a></p>
          </div> 
      </div>
    );
};

export default SignIn; 