import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

export default function Shop_All(){
    const [data, setData] = useState([]); 

    const handleGetData = async()=>{
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        setData(data); 
        console.log(data); 
    }

    useEffect(()=>{
        handleGetData(); 
    }, [])

    return(
        <div>
            <Sidebar/>
            <TopNav/>

                <div className = "pcard-section">

                    {data.map((product)=>(
                        <div key={product.id} className="pcard">
                            <h4>{product.name}</h4>
                            <p className="price">${product.price}</p>
                            <p className="description">{product.description}</p>
                        </div>
                    ))}
    
                </div>

            <EndBanner/>
        </div>
    )
}