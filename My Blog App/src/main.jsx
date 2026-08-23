import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './Store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout , Login, SignUp } from './Components/Index.js'
import EditPost from './pages/EditPost.jsx'


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
        element:<Home/>,
      },

    {
      path:'/login',
      element: (
        <AuthLayout authentication={false}>  {/* It means that login page upr jaane vaste authentication nhi chaidi  */}
          <Login/>
        </AuthLayout>
      ),
    },

    {
      path:'/signup',
      element: (
        <AuthLayout authentication={false}>  { /* Signup page vaste authentication jruri nhi hai becuasep pehla banda signup krunga then login krke hi authenticated hounga tah hi ohnu application de andar da show hona system  */}
          <SignUp/>
        </AuthLayout>
      ),
    },

    {
      path:'/all-posts',
      element : (
        <AuthLayout authentication={true}>  {/* Je bande neh saari posts dekhni hai hai tah authenticated jruri hai oh  */}
          {" "}
          <AllPosts />
        </AuthLayout>
      )
    },

    {
      path:'/add-post',
      element: (
        <AuthLayout authentication={true}> {/* Je post add karni taah bhi authenticated chaida */}
          {" "}
          <AddPost/>
        </AuthLayout>
      )
    },

    {
      path:'/edit-post/:slug',
      element: (
        <AuthLayout authentication={true}> {/* je post edit krna chaunda taah bhi complusory hai authentication  */}
          {" "}
          <EditPost/>
        </AuthLayout>
      )
    },

    {
      path:'/post/:slug', 
      element: <Post /> 

    },                     {/* Eh oh page ga jis vich kehnde ge ki -> post howe ohdi user di oh khud author howe usda  taah show kro delete and edit ala button and oh walapage  */}

    ] ,
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     
<RouterProvider router={router} />

    </Provider>
  </StrictMode>,
)
