// This file is made for making the login form where name , password etc will be handled . It will be made from the advanced external form handing library for scalability . That is : - >  React-Hook-Form 

import React ,{useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { Login as authLogin } from '../Store/AuthSlice' // We named login method as authlogin in this file and where we write the authlogin it means login . We can also write the authlogin as the Storelogin
import { useDispatch } from 'react-redux'
import { Button , Input , Logo } from './Index'
import authService from '../Appwrite/Auth_service'
import {useForm} from 'react-hook-form'   // This is mainly what we are using in it for Advanced forms . React-hool-for. -> External reacr library to handle the forms 

function Login() {


    // Using all the js logic 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ register , handleSubmit ] = useform() // Don't worry about this as this is the react-hook-form library's own syntax 
    const [error , setError ] = useState('')


    // Login Form logic 
    const login = async(data) => {

        setError('')

        try {
            const session = await authService.login(data)
               if (session ) {
                const userData = await authService.getCurrentuser()  // je taah session haiga matlab user login ho gya taah teh user da data get  karo 

                if(userData) dispatch(authLogin(userData))           // je userData mil gya taah ohnu login karvado store nu dske ki haan ok ga kaam . Login krdo taah ki state update ho jawe 
                 navigate('/')                                       // Hun login hone toh baad user nu automatically main home page pr navigate krvado    
            }

        } catch (error) { setError.message }
    }
  return (

<div className='flex items-center justify-center w-full'>
      
 <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

        <div className="mb-2 flex justify-center">

                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>

        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      
        <form onSubmit={handleSubmit(login)} className='mt-8'> {/* Here , "handleSubmit" is the reserved keyword / event of the react-hook-form . That performs some task like - whatever method name that we defined in some other file . The method inside it will run and handle the form acc. to that method  */}

            <div className='space-y-5'>

        {/* This is out Input component that we have made in the separate file  */}      
        <Input
        label ='Email: '
        placeholder ='Enter your email'
        
        />


            </div>
            
            </form>        

    </div>

</div>
  )

  
}

export default Login
