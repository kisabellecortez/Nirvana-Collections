import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'

export default function Account(){
    const navigate= useNavigate()

    const checkUser =async()=>{
        const auth = getAuth()
        const user = auth.currentUser

        if(!user){
            navigate('/signin')
        }
    }

useEffect(()=>{
    checkUser()
  })

}