import React, { useContext, createContext, useState, useEffect } from 'react'; 
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { auth, db, imageDb } from '../firebase.js' 
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

const AuthContext = createContext()

export const AuthContextProvider = ({ children })=> {
    const [user, setUser] = useState({});
    var currDate = ''

    const googleSignIn =()=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password)
       }

    const logOut =()=>{
        return signOut(auth)
    }

    const delUser =()=>{
        return deleteUser(user)
    }

    const createUser = async(email, password) =>{
        const date = new Date();  
        const day = date.getDate(); 
        const month = date.getMonth(); 
        const year = date.getFullYear(); 
        currDate = (day.toString() + month.toString() + year.toString())
        console.log(currDate)
        await createUserWithEmailAndPassword(auth, email, password)
        
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
        <AuthContext.Provider value = {{ addProduct, editProduct, delProduct, uploadImage, googleSignIn, signIn, logOut, deleteUser, delUser, createUser, user }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};