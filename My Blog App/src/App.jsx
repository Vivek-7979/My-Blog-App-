import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  
  // To access / use the env variables in react we have to use the prefix VITE_ in the variable name and then we can access it using import.meta.env.VITE_VARIABLE_NAME
  console.log(import.meta.env.VITE_APPWRITE_URL)     // this will print the value of env . 

  return (
    <>
      <h1> A blog App with Appwrite </h1>
    </>
  )
}

export default App
