import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.js'
import './App.css';

import Home from './pages/Home'
import Shop from './pages/Shop'
import ShopAll from './pages/Shop_All'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import ContactUs from './pages/ContactUs'
import Earrings from './pages/Shop_Earrings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ShoppingCart from './pages/ShoppingCart'
import Account from './pages/Account'
import Admin from './pages/Admin'

function App() {

  return(
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="shop" element={<Shop/>}/>
            <Route path="shop/earrings" element={<Earrings/>}/>
            <Route path="shop/all" element={<ShopAll/>}/>
            <Route path="faq" element={<FAQ/>}/>
            <Route path="blog" element={<Blog/>}/>
            <Route path="contactus" element={<ContactUs/>}/>
            <Route path="signin" element={<SignIn/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="shoppingcart" element={<ShoppingCart/>}/>
            <Route path="account" element={<Account/>}/>
            <Route path="admin" element={<Admin/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>

  )
}

export default App;