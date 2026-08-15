import React , { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'

import authService from './Appwrite/Auth_service'
import {login , logout } from './Store/AuthSlice'
import { Footer, Header } from './Components/Index'
import { Outlet } from 'react-router-dom'


function App() {
  
  // To access / use the env variables in react we have to use the prefix VITE_ in the variable name and then we can access it using import.meta.env.VITE_VARIABLE_NAME
  // console.log(import.meta.env.VITE_APPWRITE_URL)     // this will print the value of env . 


const [Loading , setLoading ] = useState(true)  // To show the loadinh animation 
const dispatch = useDispatch()

useEffect(() => {

  authService.getCurrentuser()   // Hun authservice vicho getCurrentUser method accesss krke run kr dena 
     
     .then((userData) => {

        if (userData) {
          dispatch(login ({userData}))   // these login and logout are the methods that we have imported from the store folder 
        } 
           else {
          dispatch(logout()) }
      })

      .catch(() => error )        // je promise fail ho gya taah catch chalna 

      .finally( ()=> setLoading(false) )   // Finally oh hunda ki eh taah run hona hi hona hai chae promise sucess howe ya fail 
} , [] )


// Conditional Rendering { je taah loading state true hoi taah ah show krna(jiwe ki koi loading animation ) nahi taah eh page jisda code likhya va hi hai } 
return (

  <div className='min-h-screen flex flex-wrap content-between bg-gray-500 '>

<div className='w-full block '>

  <Header />

<main> This is changing part the outlet 
  < Outlet />  {/*: header footer taah coanstant hi rehna vich ala change hona oh eh ga   */} 
</main>

  <Footer />

</div>

  </div>

)

}

export default App
