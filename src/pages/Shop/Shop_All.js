/* React */
import React, { useState } from 'react'

/* components */
import Sidebar from '../../components/Sidebar.js'
import TopNav from '../../components/TopNav.js'
import EndBanner from '../../components/EndBanner.js'
import { productsArray, imagesArray } from '../../data/productData.js'

import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

/* Material UI */
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Shop_All(){
    const cart = useContext(CartContext); 

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')

    const handleClick = (message) => {
        setOpen(true);
        setMessage(message)
      };
    
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    setMessage('')
    };
    
    console.log(productsArray)
    console.log(imagesArray)
    console.log(cart.items)

    /* add product to cart */
    const handleAddCart = async(id)=>{
        cart.addOneToCart(id); 
        console.log(cart)

        handleClick("Added to Cart!"); // display alert 
    }

    const handleRemoveCart = async(id) => {
        // remove from local cart if no user 
        cart.removeOneFromCart(id)
        console.log(cart)

        handleClick("Removed from Cart!")
    }

    /* check if item exists in cart */
    function checkItem(id){
        return cart.items && cart.items.some(item => item.id === id)
    }

    /* get quantity of item in cart */
    function getItemQuantity(id){
        const item = cart.items.find(item => item.id === id); 

        return item  ? item.quantity : 0; 
    }

    return(
        <div>
            <Sidebar/>
            <TopNav/>

                <div className = "pcard-section">
                    {productsArray.map((product, index)=>(
                        <div key={product.id} className="pcard">
                        {imagesArray[index] ? (
                            <img src={imagesArray[index]} alt="Product" />
                        ) : (
                            <p>No image of product...</p>
                        )}
                            <h4>{product.name}</h4>
                            <p className="price">${product.price}</p>

                            {!checkItem(product.id) ? (
                                <Button 
                                variant='contained' 
                                color='secondary'
                                type='submit' 
                                onClick={ () => handleAddCart(product.id) }>
                                    Add to Cart
                                </Button>
                            ) : (
                                <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                                    <Button onClick={ () => handleRemoveCart(product.id)}>-</Button>
                                    <Button>{getItemQuantity(product.id)}</Button>
                                    <Button onClick={ () => handleAddCart(product.id) }>+</Button>
                                </ButtonGroup>
                            )}
                            
                        </div>
                    ))}
    
                </div>
                
                <div className="alert">
                    <Snackbar
                        open={open}
                        autoHideDuration={2500}
                        onClose={handleClose}
                    >
                        <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </div>
       
            <EndBanner/>
        </div>
    )
}