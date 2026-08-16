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
const navItems = [

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

{/* here , we have the ul list and to get all the items we will loop on the navItems array  */}
<ul className='flex ml-auto'>
  
{navItems.map((item) => 
item.active ? (
<li key={item.name}>                             {/* Key is the unique id we have to give it will using the manp function on the array  */}
{                                                 /*  This navigate is got from the useNavigate of the react-router-dom */ }
  <button onClick={ () => navigate(item.URL)}    
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
       {item.name}        {/* The name that will display in the li */}
       </button>
</li>
) : null 
)}

{ authStatus && ( <li> <LogoutBtn/> </li> )} {/* This is the js or simply react injected inside the plain html in which this code says that . If the person is authenticated or simple if the person is loggedIn only then show him the logout Button in the navbar otherwise no need to show that logout button { simpley fir oh show krke krna bhi kya ga }  */}

</ul>

  </nav>


</Container>

</header>

  )
}

export default Header
