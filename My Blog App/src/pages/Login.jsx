// Just simply creating the one different page / route by using only the one component i.e. Login component in which every logic and styling is already defined 

import React from 'react'
import { Login as LoginComponent } from '../Components/Index'

function Login() {
  return (

    <div className='py-8'>

        <LoginComponent/>
      
    </div>

  )
}

export default Login
