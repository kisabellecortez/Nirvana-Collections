import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext.js'

export default function Admin(){
    /* firebase functions */
    const { addProduct } = UserAuth();
    const { editProduct } = UserAuth(); 
    const { delProduct } = UserAuth(); 

    /* form variables */
    const [nameA, setNameA] = useState('')
    const [priceA, setPriceA] = useState('')
    const [descriptionA, setDescriptionA] = useState('')
    const [stockA, setStockA] = useState('')
    const [typeA, setTypeA] = useState('')
    const [materialA, setMaterialA] = useState('')
    const [stoneA, setStoneA] = useState('')

    const [nameE, setNameE] = useState('')
    const [priceE, setPriceE] = useState('')
    const [descriptionE, setDescriptionE] = useState('')
    const [stockE, setStockE] = useState('')
    const [typeE, setTypeE] = useState('')
    const [materialE, setMaterialE] = useState('')
    const [stoneE, setStoneE] = useState('')

    const [nameD, setNameD] = useState('')

    /* add product function */
    const handleAddProduct = async()=>{
        await addProduct(nameA, priceA, descriptionA, stockA, typeA, materialA, stoneA); 
        window.alert("Product successfully added"); 
    }

    /* edit product function */
    const handleEditProduct = async()=>{
        await editProduct(nameE, priceE, descriptionE, stockE, typeE, materialE, stoneE); 
        window.alert("Product successfully editted"); 
    }

    /* delete product function */
    const handleDelProduct = async()=>{
        await delProduct(nameD); 
        window.alert("Product successfully deleted"); 
    }

    return(
        <div className="admin">
            <Sidebar/>
            <TopNav/>
            
            {/* add product form */}
            <div className="admin-form">
                <h1>ADD PRODUCT</h1>
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

                    <div className="input">
                        <div className="input-ms">
                            <label>
                                <input type="radio" id="earring" name="type" value="earring" onChange={(e)=>setTypeA(e.target.value)}></input>
                                EARRING
                            </label>

                            <label>
                                <input type="radio" id="necklace" name="type" value="necklace" onChange={(e)=>setTypeA(e.target.value)}></input>
                                NECKLACE
                            </label>

                            <label>
                                <input type="radio" id="bracelet" name="type" value="bracelet" onChange={(e)=>setTypeA(e.target.value)}></input>
                                BRACELET
                            </label>

                            <label>
                                <input type="radio" id="ring" name="type" value="ring" onChange={(e)=>setTypeA(e.target.value)}></input>
                                RING
                            </label>

                            <label>
                                <input type="radio" id="phone-charm" name="type" value="phone charm" onChange={(e)=>setTypeA(e.target.value)}></input>
                                PHONE CHARM
                            </label>

                            <label>
                                <input type="radio" id="crystal" name="type" value="crystal" onChange={(e)=>setTypeA(e.target.value)}></input>
                                CRYSTAL
                            </label>
                        </div>
                    </div>

                    <div className="input">
                        <div className="input-ms">
                            <label>
                                <input type="radio" id="gold" name="material" value="gold" onChange={(e)=>setMaterialA(e.target.value)}></input>
                                GOLD
                            </label>

                            <label>
                                <input type="radio" id="silver" name="material" value="silver" onChange={(e)=>setMaterialA(e.target.value)}></input>
                                SILVER
                            </label>
                        </div>
                    </div>

                    <div className="input">
                        <label for="name">STONE: </label>
                        <input 
                        type="text" 
                        id="stone" 
                        name="stone" 
                        value={stoneA}
                        onChange={(e)=>setStoneA(e.target.value)}
                        required></input>
                    </div>

                    <button type="submit"  onClick={ handleAddProduct }>ADD PRODUCT</button>
                </div>
            </div>
        
            {/* edit product form */}
            <div className="admin-form">
                <h1>EDIT PRODUCT</h1>
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

                    <div className="input">
                        <div className="input-ms">
                            <label>
                                <input type="radio" id="earring" name="type" value="earring" onChange={(e)=>setTypeE(e.target.value)}></input>
                                EARRING
                            </label>

                            <label>
                                <input type="radio" id="necklace" name="type" value="necklace" onChange={(e)=>setTypeE(e.target.value)}></input>
                                NECKLACE
                            </label>

                            <label>
                                <input type="radio" id="bracelet" name="type" value="bracelet" onChange={(e)=>setTypeE(e.target.value)}></input>
                                BRACELET
                            </label>

                            <label>
                                <input type="radio" id="ring" name="type" value="ring" onChange={(e)=>setTypeE(e.target.value)}></input>
                                RING
                            </label>

                            <label>
                                <input type="radio" id="phone-charm" name="type" value="phone charm" onChange={(e)=>setTypeE(e.target.value)}></input>
                                PHONE CHARM
                            </label>

                            <label>
                                <input type="radio" id="crystal" name="type" value="crystal" onChange={(e)=>setTypeE(e.target.value)}></input>
                                CRYSTAL
                            </label>
                        </div>
                    </div>

                    <div className="input">
                        <div className="input-ms">
                            <label>
                                <input type="radio" id="gold" name="material" value="gold" onChange={(e)=>setMaterialE(e.target.value)}></input>
                                GOLD
                            </label>

                            <label>
                                <input type="radio" id="silver" name="material" value="silver" onChange={(e)=>setMaterialE(e.target.value)}></input>
                                SILVER
                            </label>
                        </div>
                    </div>

                    <div className="input">
                        <label for="name">STONE: </label>
                        <input 
                        type="text" 
                        id="stone" 
                        name="stone" 
                        value={stoneE}
                        onChange={(e)=>setStoneE(e.target.value)}
                        required></input>
                    </div>

                    <button type="submit"  onClick={ handleEditProduct }>EDIT PRODUCT</button>
                </div>
            </div>

            {/* delete product form */}
            <div className="admin-form">
                <h1>DELETE PRODUCT</h1>
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