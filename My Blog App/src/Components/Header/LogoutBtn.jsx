// THE PURPOSE OF THIS COMPONENT : IS THAT WE WILL HAVE 2 THINGS INSIDE THE HEADER ONE IS THE HEADER ITSELF AND THE OTHER WOULD BE BUTTON AND THIS IS THE BUTTON COMPONENT . IT WILL ONLY HAVE THE BUTTON OF THE LOGOUT 

import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/Auth_service'
import { logout } from '../../Store/AuthSlice'

function LogoutBtn() {

    // THE JS 
 const dispatch = useDispatch()     // To dispatch the data of the logout to update the state or the latest data in the store 

 // On clicking the logout button this handler will run 
 const logoutHandler = () => {
    authService.logout().then(() => {   // From the AuthService file we used the logout method/reducer whose functionlaity is already defined in it . { But NOTE this method returns us a promise and we have to handle it in this file }
        dispatch(logout())
    })
 }
  return (
  
    // This is the Actual logout button 
 <button onClick={ logoutHandler }
 className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >  {/* The Talwind CSS  */}
      Log Out 
 </button>

  )
}

export default LogoutBtn
