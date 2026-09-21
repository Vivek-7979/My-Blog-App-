import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../Appwrite/Configs';
import { Container, PostCard } from '../Components/Index';

function Home() {
  const authStatus = useSelector((state) => Boolean(state.auth?.status));
  const [posts, setPosts] = useState([]);

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
        const postsData = await appwriteService.getPosts();
        const rows = Array.isArray(postsData)
          ? postsData
          : postsData?.rows || postsData?.documents || [];

        if (isMounted) {
          setPosts(rows);
        }
      } catch (error) {
        console.error('Home :: getPosts failed', error);
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

  if (!authStatus) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='flex flex-wrap'>
            <div className='p-2 w-full'>
              <h1 className='text-2xl font-bold hover:text-gray-500'>Login To Read POSTS</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='flex flex-wrap'>
            <div className='p-2 w-full'>
              <h1 className='text-2xl font-bold hover:text-gray-500'>No posts yet</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full py-8'>
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
  );
}

export default Home;
