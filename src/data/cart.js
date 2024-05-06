let cartArray = JSON.parse(localStorage.getItem('cart')) || []; // create array in local storage

/* get items in the cart */
export const getCart =()=> cartArray; 

/* add another of an already carted item */
export const addItem =(index)=>{
    cartArray[index].quantity += 1; 
    saveCart(); 
}

export const removeItem = (index) => {
    cartArray[index].quantity -= 1; 
    saveCart(); 
}

/* add a new item into the cart */
export const modifyCart =(newCart)=>{
    cartArray = newCart; 
    saveCart(); 
}

/* save cart information onto local storage */ 
const saveCart =()=>{
    localStorage.setItem('cart', JSON.stringify(cartArray)); 
}

/* retrieve cart */
if(localStorage.getItem('cart')){
    cartArray = JSON.parse(localStorage.getItem('cart')); 
}