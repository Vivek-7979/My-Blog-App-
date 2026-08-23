import React , {useEffect , useState }from 'react'
import appwriteService from '../Appwrite/Configs'
import { Container , PostCard } from '../Components/Index'




function Home() {

  const [posts , setPosts ] = useState([]) // to store all the posts in the state 

useEffect ( ( ) => {

  appwriteService.getPosts().then( (posts) =>{  // apa appwrite service de vicho getposts ala method le rehe tah ki sari di saari pists show krwa sakiye 

    if(posts) { setPosts(posts.rows )}

  })
} , [] )


// Je taah koi post hi nhi hoi taah apa eh wala page shwo kr dena jis vich likhya hona ki log in to see posts 
if ( posts.lenght === 0 ) {

  return (
    <div className='w-full py-8 mt-4 text-center'>

      <Container>

        <div className='flex flex-wrap'> 
          <div className=' p-2 w-full '>

        <h1 className='text-2xl font-bold hover:text-gray-500'> Login To Read POSTS </h1>
          
          </div>
        </div>

      </Container>

    </div>
  )
}

  return (

    <div className='w-full py-8'>

      <Container>

        <div className='flex flex-wrap'>

          {/* this is the js inside the html part so we written it inside the {} . Where we mapped in the only posts one by one and displayed it in the postcard page by by passing the prop that is the "...post " */}
          {posts.map((post)=> (
            <div key={posts.$id} className='p-2 w-1/4'>
              <PostCard {...post}/> </div>
          ))}


        </div>

      </Container>
      
    </div>

  )
}

export default Home
