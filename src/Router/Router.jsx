import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Products from '../Components/Products/Products'
import Cart from '../Components/Cart/Cart'
import Brands from '../Components/Brands/Brands'
import Login from '../Components/Login/Login'
import Register from '../Components/Register/Register'
import Categories from '../Components/Categories/Categories'
import Layout from '../Components/Layout/Layout'
import NotFound from '../Components/NotFound/NotFound'






export default function Router() {
    return(
        <Routes>
                <Route element={<Layout />}>
                   <Route path='/'  element={<Home/>}  />
                   <Route path='/Products' element={<Products/>}  />
                   <Route path='/Cart' element={<Cart/>}  />
                   <Route path='/Brands' element={<Brands/>}  />
                   <Route path='/Categories' element={<Categories/>}  />
                   <Route path='/Login' element={<Login/>}  />
                   <Route path='/Register' element={<Register/>}  />
                   <Route path='*' element={<NotFound/>}  />
                   
                </Route>
        </Routes>
    )
}