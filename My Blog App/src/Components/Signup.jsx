import {useState} from 'react'
import authService from '../Appwrite/Auth_service'
import { Link , useNavigate } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import LoadingAnimation from './LoadingAnimation'
import { useForm } from 'react-hook-form'



function Signup() {

// JS logic here 

const navigate = useNavigate()  //to forcefully navigate after succesfull navigation
const [error , setError ] = useState('')
const [success , setSuccess ] = useState('')
const [isSubmitting, setIsSubmitting] = useState(false)
const {register , handleSubmit } = useForm()  // This is from the react-hook-library syntax



// Creating the function / logic for the creating account / signup Process
const create = async(data) => {
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
        if (await authService.hasActiveSession()) {
            navigate('/', { replace: true })
            return
        }

        const userAccount = await authService.createAccount(data)

        if (userAccount) {
            setSuccess('Account created successfully. Please log in.')
            await new Promise((resolve) => setTimeout(resolve, 800))
            navigate('/login', { replace: true })
        }
    } catch (error) {
       setError(error.message || 'Account creation failed. Please try again.')
    } finally {
        setIsSubmitting(false)
    }
}


  
  return (
    <div className="flex items-center justify-center  ">
            <div className={`mx-auto  w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>


            {/* This div is for displaying he logo  */}
            <div className="mb-2 flex justify-center">

                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>

                </div>


                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;

                    {/* If already having an account then sending it to the login page after clicking on the link  */}
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}  {/* If there is error then display error best practice to do it like if the one statement runs then only the other runs  */}
                {success && <p className="text-green-600 mt-8 text-center">{success}</p>}

                <form onSubmit={handleSubmit(create)}>

                    <div className='space-y-5'>
 
                       {/* USing the input reusale component for the Input field of the Full Name field  */}
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />

                        {/* Same logic as that was in the Login.jsx file - copy pasted here  */}
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />


                       {/* Simple logic from the react-hook-form and the no validation just giving teh key and object inside the register (keyword of the react-hook-form library ) */}
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />

                        {/* Simple button  */}
                        <Button type="submit" disabled={isSubmitting} className={`w-full transition-transform duration-150 active:scale-[0.98] disabled:cursor-wait ${isSubmitting ? 'animate-pulse' : ''}`}>
                            {isSubmitting ? 'Creating account...' : 'Create Account'}
                        </Button>

                    </div>

                </form>

                </div>

                {isSubmitting && <LoadingAnimation className='fixed inset-0 z-50 bg-black/70' />}

    </div>
  )
}

export default Signup