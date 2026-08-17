import React ,{useId} from 'react'
import { forwardRef } from 'react'



function Select({
    // Giving the parameters here in the Select dropdown button 

    options,
    label,
    className ='' ,
    ...props

} , ref ) {  // To have the refernce of each dropdown we have the refernce of it from the forwardRef hook of react .


    // Js here 
const id = useId()  // Generating the unique id with the help of useId method from the react 

  return (

    <div className='w-full'>

        {label && <label htmlFor={id}></label>}     {/* If the label is available then show it and unique id for it by useId hook  */}
        <Select 
        {...props}
        id={id}
        ref ={ref}
        className={` px-3 py-2 rounded-lg bg-white 
                     text-black outline-none focus:bg-gray-50
                    duration-200 border border-gray-200 w-full ${className} `} >

                { options?.map((option) => (
                    <option key={option} value={option} > {option}</option>    // It means that if the option is available ? Then , use the map and display them and ive it a unique key for every label . {  Because if we not put the ? and if option has no value that 100% our app will crash }

                ))}

                    </Select>
    </div>
  )
}

export default   forwardRef(Select)    // This is also the another and easiest way to use the forwardRef hook { Earlier's method of using forwardRef was bit hard .}
