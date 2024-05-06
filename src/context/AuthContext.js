import React, { useContext, createContext, useState, useEffect } from 'react'; 
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, getAuth } from 'firebase/auth';
import { auth, db, imageDb } from '../firebase.js' 
import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

const AuthContext = createContext()

export const AuthContextProvider = ({ children })=> {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]); 

    const googleSignIn =()=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password)
    }

    /* create user with email and password */
    const createUser = async(email, password)=>{
        await createUserWithEmailAndPassword(auth, email, password);
        await signInWithEmailAndPassword(auth, email, password); 

        const userAuth = getAuth(); 

        // create user database
        onAuthStateChanged(userAuth, async(user) => {
            if(user){
                const uid = user.uid; 
                
                await setDoc(doc(db, 'users', uid), {
                    
                });

                // get product data from database 
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
                setData(productsData); // import all database information into array 

                // reference the user's cart collection in Firestore
                const cartCollectionRef = collection(db, "users", uid, "cart");

                // add each product to cart 
                productsData.forEach((product) => {
                    const cartProductRef = doc(cartCollectionRef, product.id); 

                    setDoc(cartProductRef, {
                        name: product.name, 
                        description: product.description, 
                        price: product.price, 
                        quantity: 0
                    })
                })
            }
        })
    }

    const logOut =()=>{
        return signOut(auth)
    }

    const delUser =()=>{
        return deleteUser(user)
    }

    /* add item to cart */
    const addCart = async(id)=>{
        // get user 
        const auth = getAuth(); 
        const user = auth.currentUser; 

        // reference the user's cart collection in Firestore
        const cartCollectionRef = collection(db, "users", user.uid, "cart");

        // reference the specific document (product) in the cart collection
        const cartProductRef = doc(cartCollectionRef, id);

        // check if the product already exists in the cart
        const cartSnapshot = await getDoc(cartProductRef);

        // if the product exists, increment its quantity
        const existingQuantity = cartSnapshot.data().quantity;
        const updatedQuantity = existingQuantity + 1;
        await updateDoc(cartProductRef, { quantity: updatedQuantity });
    }

    /* remove item from cart */
    const removeCart = async(id)=>{
        // get user 
        const auth = getAuth(); 
        const user = auth.currentUser;

        // reference the user's cart collection in Firestore
        const cartCollectionRef = collection(db, "users", user.uid, "cart");

        // reference the specific document (product) in the cart collection
        const cartProductRef = doc(cartCollectionRef, id);

        // check if the product already exists in the cart
        const cartSnapshot = await getDoc(cartProductRef);

        // if the product exists, increment its quantity
        const existingQuantity = cartSnapshot.data().quantity;
        const updatedQuantity = existingQuantity - 1;

        if(updatedQuantity < 0){
            await updateDoc(cartProductRef, { quantity: 0 }); 
        }
        else{
            await updateDoc(cartProductRef, { quantity: updatedQuantity }); // update quantity
        }       
    }

    /* add product in database */
    const addProduct = async(name, price, description, stock, type, material, stone)=>{
        var id = getId(name); 

        // add document 
        await setDoc(doc(db, "products", id), {
            name: name, 
            price: price, 
            description: description, 
            stock: stock,
            properties: [type, material, stone], 
            image: id
        });
    }

    /* edit product in database */
    const editProduct = async(name, price, description, stock)=>{
        var id = getId(name); 
        const docToUpdate = doc(db, "products", id); 

        // update document 
        await updateDoc(docToUpdate, {
            name: name, 
            price: price, 
            description: description, 
            stock: stock
        })
    }

    /* delete product from database */
    const delProduct = async(name)=>{
        var id = getId(name); 

        // delete document 
        await deleteDoc(doc(db, "products", id))
    }

    /* upload product image into database */
    const uploadImage = async(name, file)=>{
        var id = getId(name); 

        const storageRef = await ref(imageDb, 'products/' + id);
        return uploadBytes(storageRef, file); 
    }

    // creates id from name
    function getId(name){
        var id = ""; 
        
        // concatenate ascii codes
        for(let i = 0; i < name.length; i++){
            id += name.charCodeAt(i); 
        }

        return id; 
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);

    return(
        <AuthContext.Provider value = {{ addCart, removeCart, addProduct, editProduct, delProduct, uploadImage, googleSignIn, signIn, logOut, deleteUser, delUser, createUser, user }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};