import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import { useState } from 'react'

export default function Admin(){
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    function handleAdd(){

    }

    return(
        <div className="admin">
            <Sidebar/>
            <TopNav/>
            
            <div className="add-form">
            <div className="form">
              <div className="input">
                  <label for="name">name: </label>
                  <input 
                  type="name" 
                  id="name" 
                  name="name" 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required></input>
              </div>
              
              <div className="input">
                  <label for="name">price: </label>
                  <input 
                  type="number" 
                  id="price" 
                  name="price" 
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                  required></input>
              </div>

              <div className="input">
                  <label for="name">description: </label>
                  <input 
                  type="test" 
                  id="description" 
                  name="description" 
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  required></input>
              </div>

              <button type="submit"  onClick={ handleAdd }>Add Product</button>
            </div>
          </div>
        </div>
    )
}