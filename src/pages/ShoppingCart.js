import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'
import { CartContext } from "../context/CartContext";

import Trash from '../assets/trash.svg'

/* Material UI */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function ShoppingCart(){
    const cart = useContext(CartContext)
    const [imageUrls, setImageUrls] = useState({});
    const navigate = useNavigate(); 

    useEffect(() => {
        console.log("Current cart items:", cart.items);
    }, [cart.items]);

    useEffect(() => {
        const storage = getStorage(); 

        const fetchImageUrls = async() => {
            const urls = {}; 
            for(const item of cart.items){
                try{
                    const imageRef = ref(storage, `products/${item.id}.jpg`); 
                    const url = await getDownloadURL(imageRef); 
                    urls[item.id] = url; 
                }
                catch(error){
                    console.error("Error: ", error);
                    urls[item.id] = ""; 
                }

                setImageUrls(urls); 
            }

            setImageUrls(urls);
        }

        if(cart.items.length > 0){
            fetchImageUrls(); 
        }
    }, [cart.items]); 

    /* add product to cart */
    const handleAddOneCart = async(id, size)=>{
        cart.addOneToCart(id, size); 
        console.log(cart)
    }

    const handleRemoveOneCart = async(id, size) => {
        // remove from local cart if no user 
        cart.removeOneFromCart(id, size)
        console.log(cart)
    }

    const handleRemoveCart = async(id, size) => {
        // remove entire product from cart
        cart.deleteFromCart(id, size)
        console.log(cart)
    }

    return(
        <div className='page'>
            <Sidebar/>
            <TopNav/>

            <div className='table'>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>PRODUCT</TableCell>
                            <TableCell align="center">SIZE</TableCell>
                            <TableCell align="center">PRICE</TableCell>
                            <TableCell align="center">QUANTITY</TableCell>
                            <TableCell align="center">TOTAL</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {cart.items.map((item) => (
                            <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                <div className="table-product">
                                    <img src={imageUrls[item.id]} alt={item.name}></img>
                                    {item.name}
                                </div>
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                              {item.size}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">${item.price}</TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                                    <Button onClick={ () => handleRemoveOneCart(item.id, item.size)}>-</Button>
                                    <Button>{item.quantity}</Button>
                                    <Button onClick={() => handleAddOneCart(item.id,item.size)}>+</Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">${item.price * item.quantity}</TableCell>
                            <TableCell align="right" component="th" scope="row">
                                <img className="delete" src={Trash} alt="Trash can." onClick={ () => handleRemoveCart(item.id, item.size)}></img>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
                
            <hr></hr>
            
            <div className="text-parent">
                <div className="text-child">
                    <p className='total'>Subtotal</p>
                    <p>CAD {cart.getTotalCost().toFixed(2)}</p>
                </div>
                
                <div className="text-child">
                    <p>Tax</p>
                    <p>CAD {(cart.getTotalCost()*0.13).toFixed(2)}</p>
                </div>

                <div className="text-child">
                    <p className="bold">Total</p>
                    <p className="bold">CAD {(cart.getTotalCost()*1.13).toFixed(2)}</p>
                </div>
            </div>

            <button
                onClick={() => {
                    console.log("Checkout button clicked."); 
                    navigate('/checkout');
                }}>
                PROCEED TO CHECKOUT
            </button>
            
            <EndBanner/>

        </div>
    )
}