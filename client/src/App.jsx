
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Blogs from './Pages/Blogs';
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import Navbar from './Components/Navbar';
import UserBlogs from './Pages/UserBlogs';
import AddBlog from './Pages/AddBlog';


function App() {
  const {loading} = useSelector(state=>state.alerts)
  console.log(loading)
  return (
    <div>
      
       <BrowserRouter>
       <Navbar/>
       {
        loading ? (<Spinner/>) : (

        <Routes>
          
        
        <Route
         path='/'
         element={
          <ProtectedRoute>
         <Blogs/>
          </ProtectedRoute>
         }/>

        <Route
         path='/userblogs'
         element={
          <ProtectedRoute>
         <UserBlogs/>
          </ProtectedRoute>
         }/>

        <Route
         path='/addBlog'
         element={
          <ProtectedRoute>
         <AddBlog/>
          </ProtectedRoute>
         }/>

        <Route
         path='/login'
         element={
          <PublicRoute>
         <Login/>
         </PublicRoute>
         } />


        <Route
         path='/register'
          element={
            <PublicRoute>
          <Register/>
          </PublicRoute>
          } />

       </Routes>

        )

       }
      
       </BrowserRouter> 
      
    </div>
  )
}

export default App
