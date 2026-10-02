import React from 'react'
import sphere from '../assets/sphere-svgrepo-com.svg'
import blogsphere from '../assets/gemini-svg.svg'


// import blogsphere from '../assets/blogsphere.PNG'

function Logo({}) {
  return (
    <div>

      {/* <img src={blogsphere} alt="logo img" className='h-10 w-10' /> */}

   < div className='flex items-center justify-center gap-2'>
      <img src={sphere} alt="logo img" className='h-10 w-10' />
      <img src={blogsphere} alt="logo img" className='h-10 w-40' />
    </div>
    </div>
  )
}

export default Logo
