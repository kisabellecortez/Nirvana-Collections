class Product{
    constructor(id, name, description, price, quantity){
        this.id = id; 
        this.name = name; 
        this.description = description; 
        this.price = price; 
        this.quantity = quantity; 
    }
}

let cartArray = JSON.parse(localStorage.getItem('cart')) || []; // create array in local storage



/* get items in the cart */
export const getCart =()=> cartArray; 

/* add item */
export const addItem =(id)=>{
    let index = -1; 

    for(let i = 0; i < cartArray.length; i++){
        if(cartArray[i].id === id){
            index = i; 
        }
    }

    cartArray[index].quantity += 1; 
    saveCart(); 
}

/* remove item */
export const removeItem = (id) => {
    let index = -1; 

    for(let i = 0; i < cartArray.length; i++){
        if(cartArray[i].id === id){
            index = i; 
        }
    }

    cartArray[index].quantity -= 1; 
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