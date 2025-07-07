import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.js'
import './App.css';
import CartProvider from './context/CartContext.js'

import Home from './pages/Home'
import ShopAll from './pages/Shop/Shop_All'
// import ShopEarrings from './pages/Shop/Shop_Earrings'
// import ShopNecklaces from './pages/Shop/Shop_Necklaces'
// import ShopBracelets from './pages/Shop/Shop_Bracelets'
import ShopRings from './pages/Shop/Shop_Rings'
// import ShopAnklets from './pages/Shop/Shop_Anklets'
// import ShopPhoneCharms from './pages/Shop/Shop_PhoneCharms'
import ShopCrystals from './pages/Shop/Shop_Crystals'

import CustomOrders from './pages/Shop/Custom_Orders.js'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import ContactUs from './pages/ContactUs'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ShoppingCart from './pages/ShoppingCart'
import Account from './pages/Account'
import Admin from './pages/Admin'

import Checkout from './stripe/checkout-page.js'

function App() {

  return(
    <div>
      <AuthContextProvider>
        <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="shop/all" element={<ShopAll/>}/>
            {/* <Route path="shop/earrings" element={<ShopEarrings/>}/>
            <Route path="shop/necklaces" element={<ShopNecklaces/>}/>
            <Route path="shop/bracelets" element={<ShopBracelets/>}/>
            <Route path="shop/anklets" element={<ShopAnklets/>}/>
            <Route path="shop/phone-charms" element={<ShopPhoneCharms/>}/>
             */}
             <Route path="shop/crystals" element={<ShopCrystals/>}/>
            <Route path="shop/rings" element={<ShopRings/>}/>
            <Route path="shop/custom" element={<CustomOrders/>}/>
            <Route path="faq" element={<FAQ/>}/>
            <Route path="blog" element={<Blog/>}/>
            <Route path="contact-us" element={<ContactUs/>}/>
            <Route path="signin" element={<SignIn/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="shoppingcart" element={<ShoppingCart/>}/>
            <Route path="account" element={<Account/>}/>
            <Route path="admin" element={<Admin/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </AuthContextProvider>
    </div>

  )
}

export default App;