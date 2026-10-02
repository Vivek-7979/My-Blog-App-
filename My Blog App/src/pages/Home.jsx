import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../Appwrite/Configs';
import { Container, PostCard, LoadingAnimation } from '../Components/Index';
import blogImage from '../assets/blogImage.jpg'


function Home() {
  const authStatus = useSelector((state) => Boolean(state.auth?.status));
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!authStatus) return;

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


if (!authStatus) {
  return (
    <div className="w-full mt-20 mb-10 min-h-[calc(100dvh-72px)] flex items-center justify-center px-5 sm:px-8 py-16">
      <Container>
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">

          {/* ================= LEFT : IMAGE ================= */}
          <div className="w-full flex justify-center md:justify-start">
            <div className="relative w-full max-w-130 group">

              {/* Soft background glow */}
              <div className="absolute -inset-5 rounded-4xl bg-sky-300/10 blur-3xl opacity-60 transition-all duration-700 group-hover:opacity-90"></div>

              {/* Image container */}
              <div className="relative overflow-hidden rounded-4xl border border-slate-300/20 bg-slate-900/20 shadow-[0_25px_70px_rgba(0,0,0,0.25)] transition-transform duration-700 ease-out group-hover:scale-[1.02]">

                <img
                  src={blogImage}
                  alt="Blog reading"
                  className="w-full h-80 sm:h-95 md:h-107.5  object-cover "
                />

                {/* Subtle image overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-white/5 pointer-events-none"></div>
              </div>
            </div>
          </div>


          {/* ================= RIGHT : CONTENT ================= */}
          <div className="w-full text-center md:text-left">

            {/* Small badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-sky-200/20 bg-sky-100/5 backdrop-blur-sm">

              <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.8)]"></span>

              <span className="text-sky-200 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase">
                Members Only
              </span>

            </div>


            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-extrabold tracking-[-0.035em] leading-[1.02] text-white">

              Login to

              <span className="block mt-2  text-sky-300/90">
                Read Posts
              </span>

            </h1>


            {/* Description */}
            <p className="mt-7 max-w-xl mx-auto md:mx-0 text-base sm:text-lg leading-8 text-slate-300/90">
              Explore thoughtful articles, ideas, and stories.
              Sign in to unlock the complete collection and continue
              your reading journey.
            </p>


            {/* Login button */}
            <div className="mt-9 flex flex-col sm:flex-row items-center md:items-start gap-5">

              <Link
                to="/login"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  min-w-47.5
                  px-7
                  py-3.5
                  rounded-xl
                  bg-white
                  text-slate-900
                  font-semibold
                  tracking-wide
                  shadow-lg
                  shadow-slate-950/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-sky-100
                  hover:shadow-xl
                  hover:shadow-sky-300/10
                  active:translate-y-0
                "
              >
                Login to Continue

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>

              </Link>

            </div>


            {/* Signup */}
            <p className="mt-6 text-sm text-slate-300/90">

              Don't have an account?

              <Link
                to="/signup"
                className="
                  ml-1.5
                  text-sky-200
                  font-medium
                  transition-colors
                  duration-200
                  hover:text-white
                  hover:underline
                  underline-offset-4
                "
              >
                Create one
              </Link>

            </p>

          </div>

        </div>
      </Container>
    </div>
  );
}

  if (isLoading) {
    return <LoadingAnimation className='w-full mt-20 min-h-[calc(100dvh-72px)]' />;
  }

  if (posts.length === 0) {
    return (
      <div className='w-full mt-20 py-8 text-center'>
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
  );
}

export default Home;
