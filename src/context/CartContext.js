import { createContext, useState, useEffect } from 'react'
import { productsArray } from '../data/productData.js'

class CartProduct{
    constructor(id){
        this.id = id; 
        this.name = this.getName(id);
        this.quantity = 1;
        this.price = this.getPrice(id);
    }

    getName(id){
        const product = productsArray.find(product => product.id === id); // find product with id 

        return product ? product.name : 0; 
    }

    getPrice(id){
        const product = productsArray.find(product => product.id === id); // find product with id 

        return product ? product.price : 0;
    }
}

export const CartContext = createContext({
    items: [], 
    getProductQuantity: () => {}, 
    addOneToCart: () => {}, 
    removeOneFromCart: () => {}, 
    deleteFromCart: () => {},
    getTotalCost: () => {}
})

export function CartProvider({children}){
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cart'))) // initialize cart products with local storage value 

    /* save array of cart products in local storage each time they are modified */
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts)) 
    }, [cartProducts])

    function addOneToCart(id){
        const initialCartProducts = cartProducts || []; // initialize cart products if null

        // check if product exists 
        for(let i = 0; i < initialCartProducts.length; i++){
            if(initialCartProducts[i].id === id){
                const updatedProducts = [...initialCartProducts];
                updatedProducts[i].quantity += 1; 
                setCartProducts(updatedProducts);
                return; 
            }
        }

        setCartProducts([...initialCartProducts, new CartProduct(id)]); // add product to cart if it does not exist 
    }

    function removeOneFromCart(id) {
        // find product to delete 
        for(let i = 0; i < cartProducts.length; i++){
            if(cartProducts[i].id === id){
                // remove item from cart
                if(cartProducts[i].quantity === 1){
                    deleteFromCart(id); 
                }
                // decrement quantity of item 
                else{
                    cartProducts[i].quantity -= 1; 
                    setCartProducts([...cartProducts])
                }
            }
        }
    }

    function deleteFromCart(id) {
        const updatedCartProducts = cartProducts.filter(product => product.id !== id); 

        setCartProducts(updatedCartProducts)
    }

    function getTotalCost() {
        let total = 0; 

        // loop through each item 
        for(let i = 0; i < cartProducts.length; i++){   
            total += cartProducts[i].quantity * cartProducts[i].price; // find total price of item 
        }

        return total; 
    }

    const contextValue = {
        items: cartProducts,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;