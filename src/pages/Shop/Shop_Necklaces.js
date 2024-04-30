import Sidebar from '../../components/Sidebar.js'
import TopNav from '../../components/TopNav.js'
import EndBanner from '../../components/EndBanner.js'
import React, { useState, useEffect } from 'react'

import { UserAuth } from '../../context/AuthContext.js'
import { getAuth } from 'firebase/auth'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

export default function Shop_Necklaces(){
    const { addCart } = UserAuth(); 
    
    const [data, setData] = useState([]); 
    const [imgURL, setImgURL] = useState([]); 

    useEffect(()=>{
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(product => product.properties && product.properties[0] === "necklace");
            
            setData(productsData);

            const storage = getStorage();
            const imageDb = ref(storage, "products"); // Adjust this path according to your Firebase Storage structure

            listAll(imageDb)
                .then(imgs => {
                    const promises = imgs.items.map(item => getDownloadURL(item));
                    Promise.all(promises)
                        .then(urls => {
                            setImgURL(urls);
                        })
                        .catch(error => console.error("Error fetching image URLs:", error));
                })
                .catch(error => console.error("Error listing images in storage:", error));
        };

        fetchData();
    }, []);

    /* add product to cart */
    const handleAddCart = async(id)=>{
        // get user 
        const auth = getAuth(); 
        const user = auth.currentUser; 

        // add to database cart if user is signed in 
        if(user){
            await addCart(id); 
        }
        // add to local cart if no user
        else{
        }
    }

    return(
        <div>
            <Sidebar/>
            <TopNav/>

                <div className = "pcard-section">
                    {data.map((product, index)=>(
                        <div key={product.id} className="pcard">
                        {imgURL[index] ? (
                            <img src={imgURL[index]} alt="Product" />
                        ) : (
                            <p>No image of product...</p>
                        )}

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