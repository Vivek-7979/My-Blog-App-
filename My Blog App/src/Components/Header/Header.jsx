// HEADER TEH COANSTANT HAI HI . EH TEH DIKHNA HI GA IS VICH HUN APA CONDITIONAL RENDERING KI KYA SHOW KRNA YA NHI .. JIWE [ SIGNUP BUTTON SHOW KRNA YA NHI ; LOGOUT SHOW KRNA EH DPENDS KRUNGA STATE PR KI USER LOGGEDIN HAI YA NHII ]

import React from 'react'
import { Container , Logo , LogoutBtn } from '../Index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

const authStatus = useSelector ((state) => state.auth.status )  // Selecting the state of the authentication from authslice by react-redux library 
const navigate = useNavigate()  // For naviagte the routing 


// here , In production grade application we dont use the buttons but we use the array inside it we have many objects that navigates to some path . Because , it's easier and efficient 
const navitems = [

  // Here URl is nothing but the variable name for the path where it go . We can also write is as " Slug " . Both are CORRECT 
  { name : 'Home' , URL : '/' , active : true } ,                   { name : 'Login' , URL : '/login' , active : !authStatus , } ,
  { name : 'Signup' , URL : '/signup' , active : !authStatus , } ,  { name : 'All Posts' , URL :'/all-posts' , active :authStatus , } ,
  { name : 'Add Post' , URL : '/add-post' , active: authStatus},
]

  return (
    
<header className='py-3 shadow bg-gray-500'>

<Container>

  {/* Navbar vgera is de andar hi aundii  */}
  <nav className='flex'>

  <div className='mr-4'>

    <Link to='/'> <Logo width='70px' /> </Link>  {/* Inside this link we have the logo of the website used as an element by importing in this file as it was created in some other file */}

  </div> 



  </nav>


</Container>

</header>

  )
}

export default Header
