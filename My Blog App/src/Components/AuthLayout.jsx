// Protection mechanism [ Container ]

import React , {useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default function Protected({ children , authentication = true }) {

const navigate = useNavigate()
const [loader , setLoader ] = useState(true)
const authStatus = useSelector( state => state.auth.status )

useEffect(() => {

// TO DO : Make it more easy to understand 

if ( authentication && authStatus !== authentication ){
    navigate('/login')
}
  else if ( !authentication && authStatus !== authentication){
    navigate('/')
  }
  setLoader(false)  // chae jehra marji kaam howe login howe ya nhi loading animation flase ho jani
} , [ authStatus , navigate , authentication ])


  return loader ? <h1> Loading ... </h1> : <>{children}</>     //  Je taah loader true hai taah teh loading ali animation show krdo nhi teh childern jo hone oh krdo show  

}


