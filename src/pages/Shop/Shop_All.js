/* components */
import Sidebar from '../../components/Sidebar.js'
import TopNav from '../../components/TopNav.js'
import EndBanner from '../../components/EndBanner.js'
import { getCart, addItem, removeItem } from '../../data/cart.js'

/* React */
import React, { useState, useEffect } from 'react'

/* Firebase */
import { UserAuth } from '../../context/AuthContext.js'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'

/* product class for storing carted items (users not signed in) */
class Product{
    constructor(id, name, price){
        this.id = id; 
        this.name = name
        this.price = price; 
        this.quantity = 1; 
    }
} 

export default function Shop_All(){
    // cart 
    const currCart = getCart(); 
    const { addCart, removeCart } = UserAuth(); 

    // product database arrays 
    const [data, setData] = useState([]); 
    const [imgURL, setImgURL] = useState([]);
    const [quantity, setQuantity] = useState([]) 

   const [showAlertAdd, setShowAlertAdd] = useState(false);
   const [showAlertRemove, setShowAlertRemove] = useState(false);

   const showAdd = () => {
    setShowAlertAdd(true)
    console.log('alert')

    setTimeout(() => {
        setShowAlertAdd(false)
        console.log('done')
    }, 2000)
   }

   const showRemove = () => {
    setShowAlertRemove(true)
    console.log('alert')

    setTimeout(() => {
        setShowAlertRemove(false)
        console.log('done')
    }, 2000)
   }

    // fetch database products function
    useEffect(()=>{
        const fetchData = async () => {
            // get product data from database 
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            setData(productsData); // import all database information into array 

            // fetch images from cloud storage 
            const storage = getStorage();
            const imageDb = ref(storage, "products"); 

            // display images 
            listAll(imageDb)
                .then(imgs => {
                    // display image if URL found in product document 
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

        showAdd(); // display alert 
    }

    const handleDelCart = async(id) =>{
        const auth = getAuth(); 
        const user = auth.currentUser; 

        if(user){
            await removeCart(id); 
        }
        else{
    
        }

        showRemove(); 
    }

    // get quantity of the product in cart 
    const fetchQuantity = async(id, index) => {
        const auth = getAuth(); 
        const user = auth.currentUser; 

        if(user){
            for(let i = 0; i < data.length; i++){
                if(data[i].id === id){
                    setQuantity[index] = data[i].quantity; 
                }
            }
        }
        else{
            for(let i = 0; i < currCart.length; i++){
                if(currCart[i].id === id){
                    setQuantity[index] = currCart[i].quantity; 
                }
            }
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

                            <div className="cart-icons">
                                <MinusIcon className="icon" type="submit" 
                                    onClick={() => handleDelCart(product.id)}></MinusIcon>

                                {quantity[index] !== undefined ? (
                                    <p className="quantity">{quantity[index]}</p>
                                ) : (
                                    <p className="quantity">0</p>
                                )}

                                <AddIcon className="icon" type="submit" 
                                    onClick={() => handleAddCart(product.id)}></AddIcon>
                            </div>
                        </div>
                    ))}
    
                </div>
                
                {showAlertAdd && (
                    <div className="alert">
                        <Alert status='success'>
                            <AlertIcon />
                            Added to cart!
                        </Alert>
                    </div>
                )}
    
                {showAlertRemove && (
                    <div className="alert">
                        <Alert status='success'>
                            <AlertIcon />
                            Removed from cart!
                        </Alert>
                    </div> 
                )}

            <EndBanner/>
        </div>
    )
}