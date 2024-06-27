/* Firebase */
import { db } from '../firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

class Product{
    constructor(id, name, description, price){
        this.id = id; 
        this.name = name; 
        this.description = description;
        this.price = price; 
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

// fetch images from cloud storage 
const storage = getStorage();
const imageDb = ref(storage, "products"); 

// display images 
listAll(imageDb)
    .then(imgs => {
        // display image if URL found in product document 
        const promises = imgs.items.map(item => getDownloadURL(item)); 
        Promise.all(promises)
            .then(urls => {
                imagesArray.push(urls);
            })
            .catch(error => console.error("Error fetching image URLs:", error));
    })
    .catch(error => console.error("Error listing images in storage:", error));

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, imagesArray, getProductData }; 