/* Firebase */
import { db } from '../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

class Product{
    constructor(id, name, description, price, url){
        this.id = id; 
        this.name = name; 
        this.description = description;
        this.price = price; 
        this.url = url; 
    }
}

const productsArray = []; 
const imagesArray = []; 

// get product data from database 
const querySnapshot = await getDocs(collection(db, "products"));
const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// add each product to cart 
productsData.forEach((product) => {
    productsArray.push(new Product(product.id, product.name, product.description, product.price));
});

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, imagesArray, getProductData }; 