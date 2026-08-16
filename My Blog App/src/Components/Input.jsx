// This specific component is used to make the input field of the Form . to track the inputs of the specific fields { like - in input box we have for password , input box - for username . We have to track the inputs of all }
// here , In this we will also use the forwardRef hook that is basically used to track the reference of the specific input filed state 


import React , {useId , forwardRef } from 'react'

const Input = forwardRef(  function Input( {
label , 
type ='text',
className='' ,
...props 
} , ref  )


{ 
    const id = useId()

    return ( <div className='w-full'>   
     
     {/* Pure js / React is injected here inside the {} */}

    { label && <label 
    className='inline-block mb-1 pl-1'
    htmlFor={id}>

    {label}

         </label>}
    
    This is the main thing of the form as this is the main input field in which the input will be written .
    <input type={type}  className={ `
    px-3 py-2 rounded-lg bg-white text-black outline-none
    focus:bg-gray-50 duration-200 border border-gray-200 w-full 
    ${className} ` }
    ref ={ref}      // This is the main thing that will send the reference in the parent component that what is written inside it and will update the state from the parent component and also parent ot this input filed reference will be sent 
    {...props}
    id = {id}
    
    />

     </div>) 
     
    }

)

export default Input
