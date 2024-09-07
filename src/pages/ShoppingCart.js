import React, { useContext } from 'react'

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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function ShoppingCart(){
    const cart = useContext(CartContext)

    /* add product to cart */
    const handleAddOneCart = async(id)=>{
        cart.addOneToCart(id); 
        console.log(cart)
    }

    const handleRemoveOneCart = async(id) => {
        // remove from local cart if no user 
        cart.removeOneFromCart(id)
        console.log(cart)
    }

    const handleRemoveCart = async(id) => {
        // remove entire product from cart
        cart.deleteFromCart(id)
        console.log(cart)
    }

    return(
        <div className='page'>
            <Sidebar/>
            <TopNav/>

            <h1 className="title">YOUR CART</h1>

            <div className='table'>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>PRODUCT</TableCell>
                            <TableCell align="right">PRICE</TableCell>
                            <TableCell align="right">QUANTITY</TableCell>
                            <TableCell align="right">TOTAL</TableCell>
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
                                {item.name}
                            </TableCell>
                            <TableCell align="right">${item.price}</TableCell>
                            <TableCell align="right">
                                <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                                    <Button onClick={ () => handleRemoveOneCart(item.id)}>-</Button>
                                    <Button>{item.quantity}</Button>
                                    <Button onClick={() => handleAddOneCart(item.id)}>+</Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell align="right">{item.price * item.quantity}</TableCell>
                            <TableCell align="right">
                                <img className="delete" src={Trash} alt="Trash can." onClick={ () => handleRemoveCart(item.id)}></img>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
                
                <hr></hr>

                <h1 className='total'>TOTAL: ${cart.getTotalCost()}</h1>

                <div className="checkout">
                    <Button variant="contained" color="secondary" size="large">PROCEED TO CHECKOUT</Button>
                </div>
            
            <EndBanner/>
        </div>
    )
}