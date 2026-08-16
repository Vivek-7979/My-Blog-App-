import React from 'react'

// Hun directly hi apa sara container change kr dena vich ale child ya items api chnage ho jana 

function Container({childern}) {
  return (

    <div className='w-full max-w-7xl mx-auto px-4'> {/* This is the talwind CSS styling by the classNames */}
      {childern}
    </div>
    
  )
}

export default Container
