import Sidebar from '../../components/Sidebar.js'
import TopNav from '../../components/TopNav.js'
import EndBanner from '../../components/EndBanner.js'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

export default function Shop_All(){
    const [data, setData] = useState([]); 
    const [imgURL, setImgURL] = useState([]); 

    useEffect(()=>{
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
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