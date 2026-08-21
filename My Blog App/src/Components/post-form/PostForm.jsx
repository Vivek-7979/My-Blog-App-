import React ,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select , RTE } from '../Index'
import appwriteService from '../../Appwrite/Configs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {

const { register , handleSubmit , watch , setValue , control , getValues } = 
useForm({
defaultValues: {
        title: post?.title || '',          // dekho user hun dohve kaam krn a skda - ya new pos paun lei ya exisiting edit kara lei . Je teh edit karn aya mtlb already post hai firr -> Database vicho post di info chakke '.' naal acess krke us post vicho show krvado 
        slug : post?.slug || '' ,
        content : post?.content || '',
        status : post?.status || 'active',
},
})  // This is useForm hook from the react-hook-form library . To understand its all working and features . We have to read its documentation deeply .


const navigate = useNavigate()    // navigation feature from router
const userData = useSelector( state => state.user.userData )   // Here by using the 'useSelector' from react-redux library {know for its advanced state management feature } . We accessed the userData from the state in which user is stored 
 


return (
    <div>
      
    </div>
  )
}

export default PostForm
