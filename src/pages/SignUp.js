import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.js'

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

const SignUp =()=>{
    const navigate = useNavigate(); 
    const { createUser } = UserAuth()

    //user information
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')

    const isErrorEmail = email === ''
    const isErrorPass = password === ''

    //create new users
    const handleSignUp = async()=>{
        try{
            // confirm password 
            if(password === passwordC){
                await createUser(email, password); 
                navigate('/home')
                
            }
            else{
                return(
                    alert("Passwords do not match.")
                )
            }
       
        }
        catch(error){
            alert(error)
        }
    }

    return(
        <div className="sign-in">
            <div className="sign-in-card">
                <h1>Welcome!</h1>

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

                        <FormControl isInvalid={isErrorPass}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                            htmlSize={35}
                            width='auto' 
                            type='password' 
                            id='passwordC'
                            name='passwordC'
                            placeholder='abcd1234'
                            value={passwordC}
                            onChange={(e)=>setPasswordC(e.target.value)} />
                            {!isErrorPass ? (
                            <FormHelperText>
                                Re-enter your password.
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
                    onClick={ handleSignUp }>
                        Sign Up
                    </Button>
                </div>

                <p>Already have an account? Sign In <a href="/signin">here.</a></p>
            </div>
        </div>
    )
}

export default SignUp