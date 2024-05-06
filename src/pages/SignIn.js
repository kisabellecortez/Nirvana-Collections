import React, { useState } from 'react';  
import { UserAuth} from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'

/* chakra */
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input, 
  Stack, 
  Button
} from '@chakra-ui/react'

const SignIn =()=>{
  const { signIn } = UserAuth(); 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const isErrorEmail = email === ''
  const isErrorPass = password === ''

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
        <div className="sign-in-card">
          <h1>Welcome back!</h1>

            <div className="form">
              <Stack spacing={3}>

                <div className="inputs">
                  <FormControl isInvalid={isErrorEmail}>
                    <FormLabel>Email</FormLabel>
                    <Input 
                    htmlSize={35}
                    width='auto' 
                    type='email' 
                    id='email'
                    name='email'
                    placeholder='johndoe@gmail.com'
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} />
                    {!isErrorEmail ? (
                      <FormHelperText>
                        Enter your email 
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>Email is required.</FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isInvalid={isErrorPass}>
                    <FormLabel>Password</FormLabel>
                    <Input
                    htmlSize={35}
                    width='auto' 
                    type='password' 
                    id='password'
                    name='password'
                    placeholder='abcd1234'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />
                    {!isErrorPass ? (
                      <FormHelperText>
                        Enter your password.
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>Password is required.</FormErrorMessage>
                    )}
                  </FormControl>
                  </div>
                </Stack>

                <Button 
                  colorScheme='purple' 
                  variant='solid' 
                  type='submit' 
                  onClick={ handleSignIn }>
                    Sign In
                  </Button>
            </div>

            <p>Don't have an account? Sign up <a href="/signup">here.</a></p>
          </div> 
      </div>
    );
};

export default SignIn; 