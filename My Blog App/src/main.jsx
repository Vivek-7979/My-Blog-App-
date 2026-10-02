import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './Store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Components/AuthLayout.jsx'
import LoadingAnimation from './Components/LoadingAnimation.jsx'

const loadPage = (loadComponent, authentication) => async () => {
  const Page = (await loadComponent()).default
  const page = <Page />

  return {
    element: authentication === undefined
      ? page
      : <AuthLayout authentication={authentication}>{page}</AuthLayout>,
  }
}

// Hun ithe perform honi saari routing 
// Routing apa perfrom karvani hun authlayout vich wrap krvake because authlayout neh dasna sanu ki person/user authenticated hai ya nhi 
// AuthLayout da eh kaam ga ki :- je taah person authenticated hai taah ohnu oh wale page show kro jis vich authenication chaidi jiwe - allposts , edit posts , add-post , for seeing posts etc . Teh je oh authenticatd hai hi nhi ga taah usnu login ale page pr render krvado  nhi home ute 

const router = createBrowserRouter([

  { 
    path:'/',
    element: <App/>,
    children : [

      {
        path:'/',
        lazy: loadPage(() => import('./pages/Home.jsx')),
      },

    {
      path:'/login',
      lazy: loadPage(() => import('./pages/Login.jsx'), false),
    },

    {
      path:'/signup',
      lazy: loadPage(() => import('./pages/SignUp.jsx'), false),
    },

    {
      path:'/all-posts',
      lazy: loadPage(() => import('./pages/AllPosts.jsx'), true),
    },

    {
      path:'/add-post',
      lazy: loadPage(() => import('./pages/AddPost.jsx'), true),
    },

    {
      path:'/edit-post/:slug',
      lazy: loadPage(() => import('./pages/EditPost.jsx'), true),
    },

    {
      path:'/post/:slug', 
      lazy: loadPage(() => import('./pages/Post.jsx'), true),
    },

    ] ,
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     
<RouterProvider router={router} fallbackElement={<LoadingAnimation className='p-8 flex-1' />} />

    </Provider>
  </StrictMode>,
)
