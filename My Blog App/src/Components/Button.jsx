// COMMON BUTTON DESIGN { created once and used in many places multiple times }


import React from 'react'


// inside thi () of the button functional components arguments/ props is passed that what props it will accept 
function Button({
    childern ,
    type = 'button',
    bgColor ='bg-blue-600' ,
    textColor = 'text-white' ,  
     className ='' ,
    ...props 
})


{ /* These are the default vales of the type , bgcolor and textcolor the user can overwrite it  */}
{ /* childern- also received is sent from the parent button inside some component where it is passed 
    ...props - It mwans that je koi hor bhi prop passs kar dite ve button vich taah usnu bhi spread krke receive krlo 
    className=''  - it is empty because if the user want to pass some other className in the button where it is created that he can */}

{ return (
    
    <button  className={ ` px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props }    // This is the js injected in the button where if the user has passed some of the talwind classname inside the button where it is created that it can be injected here by using the " className , bgColor , textColor " variable . Otherwise , default styling is already given her 
     > 
    {childern}
     </button>

  )
}

export default Button
