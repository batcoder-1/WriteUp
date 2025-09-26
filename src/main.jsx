import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './store/Store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Addpost from '../pages/Addpost.jsx'
import Signup from './components/Signup.jsx'
import Editpost from '../pages/Editpost.jsx'
import Post from '../pages/Post.jsx'
import Allpost from '../pages/Allpost.jsx'
import About from './components/About.jsx'
import Account from '../pages/Account.jsx'
import MyBlogs from '../pages/MyBlogs.jsx'
const router=createBrowserRouter([
{// we wrap it in authlayout as we created it to protect our route
  path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/login",
            element: (
                <AuthLayout Authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout Authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout Authentication>
                    {" "}
                    <Allpost />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout Authentication>
                    {" "}
                    <Addpost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/slug",
            element: (
                <AuthLayout Authentication>
                    {" "}
                    <Editpost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
         path: "/about",
         element: <About />,
        },
        {
            path:"/account",
            element: (
                <AuthLayout Authentication>
                    <Account />
                </AuthLayout>
            )
        },
        {
            path: "/my-blogs",
            element: (
                <AuthLayout Authentication>
                    <MyBlogs />
                </AuthLayout>
            )
        }
    ], 
}
])
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router}/>
  </Provider>,
)
