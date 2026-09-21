import React , {useEffect , useState } from 'react'
import { Container , PostForm } from '../Components/Index'
import appwriteService from '../Appwrite/Configs'
import {useNavigate ,useParams} from 'react-router-dom'



function EditPost() {

    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((postData) => {
                if (postData) {
                    setPost(postData)
                    return
                }

                navigate('/')
            }).catch(() => navigate('/'))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  return  post ? (

    <div className='py-8'>

  <Container>
      <PostForm post={post}/>   {/* JE taah post haigi  hai taah ohnu edit ala page show krdo  */}
  </Container>

    </div>

  ) : null

}

export default EditPost
