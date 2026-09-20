import React , {useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import appwriteService from '../Appwrite/Configs'
import { Container , PostCard } from '../Components/Index'

function AllPosts() {

    const authStatus = useSelector((state) => Boolean(state.auth?.status));
    const [posts , setPosts ] = useState([])

    useEffect(() => {
        let isMounted = true;

        if (!authStatus) {
            setPosts([]);
            return () => {
                isMounted = false;
            };
        }

        const fetchPosts = async () => {
            try {
                const postsData = await appwriteService.getPosts([]);

                if (isMounted && postsData) {
                    setPosts(postsData.rows || []);
                }
            } catch (error) {
                console.error('AllPosts :: getPosts failed', error);
                if (isMounted) {
                    setPosts([]);
                }
            }
        };

        fetchPosts();

        return () => {
            isMounted = false;
        };
    }, [authStatus]);

  return (

    <div className='w-full py-8'>
      
   <Container>
    <div className='flex flex-wrap'> 

        {posts.map((post) => (

            <div key={post.$id} className='p-2 w-1/4'> <PostCard post={post} /></div>
        
        ))}
    </div>
    
   </Container>

    </div>
  
)
}

export default AllPosts
