/* Firebase */
import { db } from '../firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

class Product{
    constructor(id, name, description, price, properties){
        this.id = id; 
        this.name = name; 
        this.description = description;
        this.price = price; 
        this.properties = properties; 
    }
}

const auth = getAuth(); 
const user = auth.currentUser(); 

const productsArray = []; 

// get product data from database 
const querySnapshot = await getDocs(collection(db, user.uid));
const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// add each product to cart 
productsData.forEach((product) => {
    productsArray.push(new Product(product.id, product.name, product.description, product.price, product.properties[0]));
});


function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData }; 