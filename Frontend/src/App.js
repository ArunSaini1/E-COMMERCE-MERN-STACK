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
import store from './store'
import { loadUser } from './actions/userAction'
import UserOptions from './component/layout/UserOptions'
import { useSelector } from 'react-redux'



export default function App() {

  const {isAuthenticated,user} = useSelector(state=>state.user)

  React.useEffect(()=>{
webFont.load({
  google:{
    families:["Roboto","Droid Sans","Chilanka"]
  }
});
store.dispatch(loadUser());
  },[])
  return (
  <>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/>}
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
