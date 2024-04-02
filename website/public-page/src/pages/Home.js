import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home(){

    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios.get('https://localhost:3001/getProducts')
        .then(products => setProducts(products.data))
        .catch(err => console.log(err))
    }, [])
    
    return(
        <div>
            <Sidebar/>
            <TopNav/>
            
            <div className="home">
            <div className = "new-arrivals">
            
            </div>

            <div className = "bestsellers">

            </div>

            <a className="about" href="/">
                <h1>Welcome to Nirvana Collections</h1>
                <p>Handmade crystal jewelry.</p>
                <p>Intentionally made, ethically sourced.</p>
            </a>

            <div className = "pcard-section">
                <h1>BESTSELLERS</h1>

              

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>
            </div>

            <div className="pcard-section">
                <h1>NEW ARRIVALS</h1>
                {
                    products.map(product =>{
                        return(
                            <div className="prod">
                                <p>{product.name}</p>
                                <p>here</p>
                            </div>
                        )
                    })
                }
                <div className="pcard">

                </div>

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>

                <div className="pcard">

                </div>
            </div>

            </div>

            <EndBanner/>
        </div>
    )
}