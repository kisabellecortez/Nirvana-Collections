import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase.js' 

class Product {
    constructor(id, name, description, price) {
        this.id = id; 
        this.name = name; 
        this.description = description; 
        this.price = price; 
        this.quantity = 0; 
    }
}

const initializeCartArray = async () => {
    // Check if cart data exists in local storage
    let cartArray = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cartArray if not found in local storage
    
    // get product data from database 
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // add each product to cart 
    productsData.forEach((product) => {
        cartArray.push(new Product(product.id, product.name, product.description, product.price));
    });

    console.log(cartArray);
    

    return cartArray; // Return the cartArray
}

// Use async/await to assign the resolved value of the promise to cart
const initializeCart = async () => {
    return await initializeCartArray();
}

let cart = [];

initializeCart().then((result) => {
    cart = result;
}).catch((error) => {
    console.error('Error initializing cart:', error);
}); 

/* get items in the cart */
export const getCart = () => cart; 

/* add item */
export const addItem = (id) => {
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === id){
            cart[i].quantity += 1; 
        }
    }
}

/* remove item */
export const removeItem = (id) => {
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === id){
            if(cart[i] !== 0){
                cart[i].quantity -= 1; 
            }
        }
    }
}

/* save cart information onto local storage */ 
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

// Save cart when navigating away from the page
window.onbeforeunload = () => {
    saveCart();
};
