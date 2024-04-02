import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext.js'

export default function Admin(){
    const { addProduct } = UserAuth();
    const {editProduct } = UserAuth(); 
    const { delProduct } = UserAuth(); 

    const [nameA, setNameA] = useState('')
    const [priceA, setPriceA] = useState('')
    const [descriptionA, setDescriptionA] = useState('')
    const [stockA, setStockA] = useState('')

    const [nameE, setNameE] = useState('')
    const [priceE, setPriceE] = useState('')
    const [descriptionE, setDescriptionE] = useState('')
    const [stockE, setStockE] = useState('')

    const [nameD, setNameD] = useState('')

    const handleAddProduct = async()=>{
        await addProduct(nameA, priceA, descriptionA, stockA); 
        window.alert("Product successfully added"); 
    }

    const handleEditProduct = async()=>{
        await editProduct(nameE); 
        window.alert("Product successfully editted"); 
    }

    const handleDelProduct = async()=>{
        await delProduct(nameD); 
        window.alert("Product successfully deleted"); 
    }

    return(
        <div className="admin">
            <Sidebar/>
            <TopNav/>
            
            <div className="admin-form">
                <div className="form">
                    <div className="input">
                        <label for="name">PRODUCT NAME: </label>
                        <input 
                        type="name" 
                        id="name" 
                        name="name" 
                        value={nameA}
                        onChange={(e)=>setNameA(e.target.value)}
                        required></input>
                    </div>
                
                    <div className="input">
                        <label for="name">PRICE: </label>
                        <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        min="0"
                        value={priceA}
                        onChange={(e)=>setPriceA(e.target.value)}
                        required></input>
                    </div>

                    <div className="input">
                        <label for="name">DESCRIPTION: </label>
                        <input 
                        type="test" 
                        id="description" 
                        name="description" 
                        value={descriptionA}
                        onChange={(e)=>setDescriptionA(e.target.value)}
                        required></input>
                    </div>

                    <div className="input">
                        <label for="name">STOCK: </label>
                        <input 
                        type="number" 
                        id="stock" 
                        name="stock" 
                        min="0"
                        value={stockA}
                        onChange={(e)=>setStockA(e.target.value)}
                        required></input>
                    </div>

                    <button type="submit"  onClick={ handleAddProduct }>ADD PRODUCT</button>
                </div>
            </div>
        
            <div className="admin-form">
                <div className="form">
                    <div className="input">
                        <label for="name">PRODUCT NAME: </label>
                        <input 
                        type="name" 
                        id="name" 
                        name="name" 
                        value={nameE}
                        onChange={(e)=>setNameE(e.target.value)}
                        required></input>
                    </div>
                
                    <div className="input">
                        <label for="name">PRICE: </label>
                        <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        min="0"
                        value={priceE}
                        onChange={(e)=>setPriceE(e.target.value)}
                        required></input>
                    </div>

                    <div className="input">
                        <label for="name">DESCRIPTION: </label>
                        <input 
                        type="test" 
                        id="description" 
                        name="description" 
                        value={descriptionE}
                        onChange={(e)=>setDescriptionE(e.target.value)}
                        required></input>
                    </div>

                    <div className="input">
                        <label for="name">STOCK: </label>
                        <input 
                        type="number" 
                        id="stock" 
                        name="stock" 
                        min="0"
                        value={stockE}
                        onChange={(e)=>setStockE(e.target.value)}
                        required></input>
                    </div>

                    <button type="submit"  onClick={ handleEditProduct }>EDIT PRODUCT</button>
                </div>
            </div>

            <div className="admin-form">
                <div className="form">
                    <div className="input">
                        <label for="name">PRODUCT NAME: </label>
                        <input 
                        type="name" 
                        id="name" 
                        name="name" 
                        value={nameD}
                        onChange={(e)=>setNameD(e.target.value)}
                        required></input>
                    </div>
                </div>

                <button type="submit"  onClick={ handleDelProduct }>DELETE PRODUCT</button>
            </div>
        </div>
    )
}