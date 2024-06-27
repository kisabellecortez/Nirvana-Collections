import React, { useState, useContext } from 'react'

import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'
import { productsArray, imagesArray } from '../data/productData.js'
import { CartContext } from "../context/CartContext";

/* Material UI */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function ShoppingCart(){
    const cart = useContext(CartContext)

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
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.price * item.quantity}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
                
                <hr></hr>

                <h1 className='total'>TOTAL: {cart.getTotalCost()}</h1>

                <div className="checkout">
                    <Button variant="contained" color="secondary" size="large">PROCEED TO CHECKOUT</Button>
                </div>
            
            <EndBanner/>
        </div>
    )
}