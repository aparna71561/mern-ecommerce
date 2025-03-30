import { useSelector } from 'react-redux';
import {
  Navigate,
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from './component/auth/AuthSlice';
import { Logout } from './component/auth/components/Logout';
import { Protected } from './component/auth/components/Protected';
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import { AddProductPage, ForgotPasswordPage, HomePage, LoginPage, ProductDetailsPage, ProductUpdatePage, ResetPasswordPage, SignupPage,  UserProfilePage,  } from './pages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './index.css';  



function App() {

  const isAuthChecked=useSelector(selectIsAuthChecked)
  const loggedInUser=useSelector(selectLoggedInUser)


  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);


  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
        <Route exact path='/logout' element={<Protected><Logout/></Protected>}/>
        <Route exact path='/product-details/:id' element={<Protected><ProductDetailsPage/></Protected>}/>

        {
          loggedInUser?.isAdmin?(
            // admin routes
            <>
            <Route path='/admin/dashboard' element={<Protected><AdminDashboardPage/></Protected>}/>
            <Route path='/admin/product-update/:id' element={<Protected><ProductUpdatePage/></Protected>}/>
            <Route path='/admin/add-product' element={<Protected><AddProductPage/></Protected>}/>
            <Route path='*' element={<Navigate to={'/admin/dashboard'}/>}/>
            </>
          ):(
            // user routes
            <>
            <Route path='/' element={<Protected><HomePage/></Protected>}/>
            <Route path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
            </>
          )
        }

        <Route path='*' element={<NotFoundPage/>} />

      </>
    )
  )

  
  return isAuthChecked ? <RouterProvider router={routes}/> : "";
}

export default App;

