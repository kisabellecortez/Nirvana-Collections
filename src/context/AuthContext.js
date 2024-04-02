import React, { useContext, createContext, useState, useEffect } from 'react'; 
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase.js' 
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'

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

    const addProduct = async(name, price, description, stock)=>{
        // make product id 
        var id = ""; 
        
        for(let i = 0; i < name.length; i++){
            id += name.charCodeAt(i); 
        }

        await setDoc(doc(db, "products", id), {
            name: name, 
            price: price, 
            description: description, 
            stock: stock
        });
    }

    const editProduct = async(name, price, description, stock)=>{
        // make product id 
        var id = ""; 
        
        for(let i = 0; i < name.length; i++){
            id += name.charCodeAt(i); 
        }

        const docToUpdate = doc(db, "products", id); 

        await updateDoc(docToUpdate, {
            name: name, 
            price: price, 
            description: description, 
            stock: stock
        })
    }

    const delProduct = async(name)=>{
        // make product id 
        var id = ""; 
        
        for(let i = 0; i < name.length; i++){
            id += name.charCodeAt(i); 
        }

        await deleteDoc(doc(db, "products", id))
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
        <AuthContext.Provider value = {{ addProduct, editProduct, delProduct, googleSignIn, signIn, logOut, deleteUser, delUser, createUser, user }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};