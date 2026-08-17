import React from 'react'
import appwriteService from '../Appwrite/Configs'
import { Link } from 'react-router-dom'


function PostCard({ $id , title , featuredImage }) {
  return (
    
<Link to={`/post/ ${id}`}>

<div className='w-full bg-gray-100 rounded-xl p-4'>

<div className='w-full justify-center mb-4'>

    <img src={appwriteService.getFilePreview(featuredImage)}  alt={title} // Getting the image preview in the posts section and making this whole card specific cards 
    className='rounded-xl'/>

</div>

<h2 className='text-xl font-bold' >  {title} </h2>

</div>
</Link>

  )
}

export default PostCard
