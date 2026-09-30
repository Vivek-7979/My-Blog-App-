// THE PURPOSE OF THIS COMPONENT : IS THAT WE WILL HAVE 2 THINGS INSIDE THE HEADER ONE IS THE HEADER ITSELF AND THE OTHER WOULD BE BUTTON AND THIS IS THE BUTTON COMPONENT . IT WILL ONLY HAVE THE BUTTON OF THE LOGOUT 

import { useState } from 'react'

function LogoutBtn({ onLogout, isLoggingOut }) {
   const [isMenuOpen, setIsMenuOpen] = useState(false)

   return (
      <div
         className='relative'
         onMouseEnter={() => setIsMenuOpen(true)}
         onMouseLeave={() => setIsMenuOpen(false)}
         onFocusCapture={() => setIsMenuOpen(true)}
         onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
               setIsMenuOpen(false)
            }
         }}
      >
         <button
            type='button'
            aria-haspopup='menu'
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
         >
            Account
         </button>
         {isMenuOpen && (
            <div role='menu' className='absolute right-0 top-full z-20 min-w-max pt-2'>
               <button
                  type='button'
                  role='menuitem'
                  disabled={isLoggingOut}
                  onClick={onLogout}
                  className='rounded-lg bg-white px-4 py-2 text-gray-900 shadow-lg hover:bg-blue-50  hover:underline cursor-pointer disabled:cursor-wait'
               >
                  Logout of Account
               </button>
            </div>
         )}
      </div>
  )
}

export default LogoutBtn
