import React from 'react'
import Header from './component/layout/Header'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import webFont from 'webfontloader'
import Footer from './component/layout/Footer'
import Home from './component/Home'
import './App.css'
import ProductDetails from './component/ProductDetails'
import Products from './component/Products'
import Search from './component/Search'
import Login from './component/Login'



export default function App() {

  React.useEffect(()=>{
webFont.load({
  google:{
    families:["Roboto","Droid Sans","Chilanka"]
  }
})
  },[])
  return (
  <>
    <Header/>
  <Routes>

    <Route path='/' element={<Home/>} />
    <Route path='/product/:id'  element={<ProductDetails/>} />
    <Route path='/products' element={<Products/>} />
    <Route path='/products/:keyword' element={<Products/>} />
    <Route path='/search' element={<Search/>} />
    <Route path='/login' element={<Login/>} />
  </Routes>
  <Footer/>
    </>
  )
}
