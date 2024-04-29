import React, { useContext, createContext, useState, useEffect } from 'react'; 
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, getAuth } from 'firebase/auth';
import { auth, db, imageDb } from '../firebase.js' 
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

const AuthContext = createContext()

export const AuthContextProvider = ({ children })=> {
    const [user, setUser] = useState({});

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
        onAuthStateChanged(userAuth, (user)=>{
            if(user){
                const uid = user.uid; 
                
                setDoc(doc(db, 'users', uid), {
                    
                });
            }
        })
    }

    const logOut =()=>{
        return signOut(auth)
    }

    const delUser =()=>{
        return deleteUser(user)
    }

    /* add to cart */
    const addCart = async(id)=>{
        try{    
            // get user 
            const auth = getAuth(); 
            const user = auth.currentUser; 

            // get product information 
            const prodRef = doc(db, "products", id);
            const prodSnapshot = await getDoc(prodRef);
            const prodData = prodSnapshot.data();
            const prodPrice = prodData.price;
            const prodName = prodData.name; 
            console.log("Product price:", prodPrice);

            // reference the user's cart collection in Firestore
            const cartCollectionRef = collection(db, "users", user.uid, "cart");

            // reference the specific document (product) in the cart collection
            const cartProductRef = doc(cartCollectionRef, id);

            // check if the product already exists in the cart
            const cartSnapshot = await getDoc(cartProductRef);

            if (cartSnapshot.exists()) {
                // if the product exists, increment its quantity
                const existingQuantity = cartSnapshot.data().quantity;
                const updatedQuantity = existingQuantity + 1;
                await updateDoc(cartProductRef, { quantity: updatedQuantity });
            } else {
                // if the product doesn't exist, add it to the cart with quantity 1
                await setDoc(cartProductRef, { 
                    quantity: 1,
                    name: prodName, 
                    price: prodPrice 
                });
            }
        }
        catch(error){
            alert('Product was unable to add to your cart.');
            console.log(error); 
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
        <AuthContext.Provider value = {{ addCart, addProduct, editProduct, delProduct, uploadImage, googleSignIn, signIn, logOut, deleteUser, delUser, createUser, user }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};