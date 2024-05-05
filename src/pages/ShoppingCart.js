import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'
import { getCart } from '../data/cart.js'

/* React */
import React, { useState, useEffect } from 'react'

/* Firebase */
import { db } from '../firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

export default function ShoppingCart(){
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const [imgURL, setImgURL] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const localCart = getCart(); 

    useEffect(() => {
        const fetchData = async() => {
            const auth = getAuth(); 
            const storage = getStorage();
            
            onAuthStateChanged(auth, async (currUser) => {
                // fetch current user 
                console.log(currUser); 
                setUser(currUser);

                // display data from user cart database
                if(currUser){
                    // fetch user cart database 
                    const querySnapshot = await getDocs(collection(db, "users", currUser.uid, "cart"));
                    const cartData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    
                    setData(cartData); // set an array of cart items 
                    console.log(data);         

                    // fetch images for database
                    const promises = cartData.map(product => {
                        const gsRef = ref(storage, 'gs://nirvana-collections-backend.appspot.com/products/' + product.id)
                        return getDownloadURL(gsRef)
                    })

                    Promise.all(promises)
                        .then(urls => {
                            setImgURL(urls)
                        })
                        .catch(error => console.error(error))
                }
                else{
                    console.log(localCart); 

                    // fetch images fort cart 
                    const promises = localCart.map(product => {
                        const gsRef = ref(storage, 'gs://nirvana-collections-backend.appspot.com/products/' + product.id)
                        return getDownloadURL(gsRef)
                    })

                    Promise.all(promises)
                        .then(urls => {
                            setImgURL(urls)
                        })
                        .catch(error => console.error(error))
                }
            })
        };

        fetchData(); 
    }, [])

    useEffect(() => {
        let totalPrice = 0; 

        // add up prices 
        // fetch prices from user database
        if(user){
            data.forEach(product => {
                totalPrice += product.price * product.quantity; 
            })
        }
        // fetch prices from local cart 
        else{
            for(let i = 0; i < localCart.length; i++){
                totalPrice += localCart[i].price * localCart[i].quantity; 
            }
        }

        setTotalPrice(totalPrice); 
        
    }, [data, imgURL])

    return(
        <div className="shopping-card">
            <Sidebar/>
            <TopNav/>

            <p>shopping cart</p>

            <div className = "cart">
                {user ? (
                    data.map((product, index)=>(
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
                    ))
                ) : (
                    localCart.map((product, index) => (
                        <div key={product.id} className="cartCard">
                            {imgURL[index] ? (
                                <img src={imgURL[index]} alt="Product" />
                            ) : (
                                <p>No image of product...</p>
                            )}

                            <h4 className="prodName">{product.name}</h4>
                            <h4 className="prodAmt">x{product.quantity}</h4>
                            <h4 classname="prodPrice">${product.price}</h4>
                        </div>
                    ))
                )}
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