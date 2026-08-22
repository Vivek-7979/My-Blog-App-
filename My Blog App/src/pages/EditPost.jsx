import React , {useEffect , useState } from 'react'
import { Container , PostForm } from '../Components/Index'
import appwriteService from '../Appwrite/Configs'
import {useNavigate ,useParams} from 'react-router-dom'



function EditPost() {

    const [post , setPosts ] = useState([])
    const {slug} = useParams()   // to get the values form the url 
    const navigate = useNavigate()


useEffect(()=> {
    if(slug){
        appwriteService.getPost(slug.then((post) =>{

      if(post){
        setPosts(post)
      }
    }) )
    } 
    else { navigate('/')}

} ,[] )

  return  post ? (

    <div className='py-8'>

  <Container>
      <PostForm post={post}/>
  </Container>

    </div>

  ) : null

}

export default EditPost
