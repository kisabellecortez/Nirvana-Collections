import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { getAuth } from "firebase/auth";
import { useEffect } from 'react'

export default function Account(){
    const navigate= useNavigate()

    const checkUser =async()=>{
        const auth = getAuth()
        const user = auth.currentUser

        if(user){
            navigate('/account')
        }
        else{
            navigate('/signin')
        }
    }

useEffect(()=>{
    checkUser()
  })

  return(
    <div className="account">
        <Sidebar/>
        <TopNav/>
    </div>

  )

}