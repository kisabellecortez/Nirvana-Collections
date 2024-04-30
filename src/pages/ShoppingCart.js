import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'

/* React */
import React, { useState, useEffect } from 'react'

/* Firebase */
import { db } from '../firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

export default function ShoppingCart(){
    const [data, setData] = useState([]);
    const [imgURL, setImgURL] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            const auth = getAuth(); 
            
            onAuthStateChanged(auth, async (user) => {
                console.log(user); 

                // display data from user cart database
                if(user){
                    const querySnapshot = await getDocs(collection(db, "users", user.uid, "cart"));
                    const cartData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                    setData(cartData);
    
                    const storage = getStorage(); 
                    const imageDb = ref(storage, "products"); 
    
                    listAll(imageDb)
                        .then(imgs => {
                            const promises = imgs.items.map(item => getDownloadURL(item));
                            Promise.all(promises)
                                .then(urls => {
                                    setImgURL(urls);
                                })
                                .catch(error => console.error(error));
                        })
                        .catch(error => (error));
                }
                // display data from temporary array 
                else{

                }
            })
        };

        fetchData(); 
    }, [])

    useEffect(() => {
        let totalPrice = 0; 
        data.forEach((product, index) => {
            totalPrice += product.price * product.quantity; 
        })

        setTotalPrice(totalPrice); 
    }, [data, imgURL])

    return(
        <div className="shopping-card">
            <Sidebar/>
            <TopNav/>

            <p>shopping cart</p>

            <div className = "cart">
                    {data.map((product, index)=>(
                        <div key={product.id} className="cartCard">
                        {imgURL[index] ? (
                            <img src={imgURL[index]} alt="Product" />
                        ) : (
                            <p>No image of product...</p>
                        )}
                            <h4 className="prodName">{product.name}</h4>
                            <h4 className="prodAmt">x{product.quantity}</h4>
                            <h4 className="prodPrice">${product.price}</h4>
                        </div>
                    ))}
            </div>

            <hr></hr>

            <div className="total">
                <h1>TOTAL: </h1>
                <h1 className="total-price">${totalPrice}</h1>
            </div>

            <div>

            </div>

            <EndBanner/>
        </div>
    )
}