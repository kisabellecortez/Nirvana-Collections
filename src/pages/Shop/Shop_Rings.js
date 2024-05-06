import Sidebar from '../../components/Sidebar.js'
import TopNav from '../../components/TopNav.js'
import EndBanner from '../../components/EndBanner.js'
import { getCart, modifyItem, modifyCart } from '../../data/cart.js'
import React, { useState, useEffect } from 'react'

import { UserAuth } from '../../context/AuthContext.js'
import { getAuth } from 'firebase/auth'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/* product class for storing carted items (users not signed in) */
class Product{
    constructor(id, name, price){
        this.id = id; 
        this.name = name
        this.price = price; 
        this.quantity = 1; 
    }
} 

export default function Shop_Rings(){
    const currCart = getCart(); 

    const { addCart } = UserAuth(); 
    
    const [data, setData] = useState([]); 
    const [imgURL, setImgURL] = useState([]); 

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    useEffect(()=>{
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(product => product.properties && product.properties[0] === "ring");
            
            setData(productsData);

            const storage = getStorage();
            const imageDb = ref(storage, "products"); 

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
    const handleAddCart = async(id, name, price)=>{
        // get user 
        const auth = getAuth(); 
        const user = auth.currentUser; 

        // add to database cart if user is signed in 
        if(user){
            await addCart(id); 
        }
        // add to local cart if no user
        else{
            let duplicate = false; 

            // check for duplicate items 
            for(let i = 0; i < currCart.length; i++){
                // add amount to item if there is duplicate
                if(currCart[i].id === id){
                    duplicate = true; 
                    modifyItem(i); 
                    break;  
                }
            }

            // add item if new to cart 
            if(!duplicate){
                currCart.push(new Product(id, name, price)); 
                modifyCart(currCart);
            }
            
            console.log(getCart()); // display cart
        }

        handleClick(); // display alert 
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

                            <div className="prod-icons">
                                <IconButton className="cart" type="submit" onClick={()=>handleAddCart(product.id, product.name, product.price)} color="primary" aria-label="add to shopping cart"> 
                                    <AddShoppingCartIcon/>
                                </IconButton>
                            </div>

                            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                                <Alert
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                                >
                                Added to cart!
                                </Alert>
                            </Snackbar>

                        </div>
                    ))}
    
                </div>

            <EndBanner/>
        </div>
    )
}