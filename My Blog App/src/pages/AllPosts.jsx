import {useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import appwriteService from '../Appwrite/Configs'
import { Container , PostCard, LoadingAnimation } from '../Components/Index'

function AllPosts() {

    const authStatus = useSelector((state) => Boolean(state.auth?.status));
    const [posts , setPosts ] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true;

        if (!authStatus) return;

        const fetchPosts = async () => {
            try {
                const postsData = await appwriteService.getPosts([]);
                const rows = Array.isArray(postsData)
                    ? postsData
                    : postsData?.rows || postsData?.documents || [];

                if (isMounted) {
                    setPosts(rows);
                }
            } catch (error) {
                console.error('AllPosts :: getPosts failed', error);
                if (isMounted) {
                    setPosts([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchPosts();

        return () => {
            isMounted = false;
        };
    }, [authStatus]);

  return (

        isLoading ? <LoadingAnimation className='w-full mt-20 min-h-[calc(100dvh-72px)]' /> :
    <div className='w-full mt-20 py-8'>
      
   <Container>
    <div className='flex flex-wrap'> 

        {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post} />
            </div>
        ))}
    </div>
    
   </Container>

    </div>
  
)
}

export default AllPosts
