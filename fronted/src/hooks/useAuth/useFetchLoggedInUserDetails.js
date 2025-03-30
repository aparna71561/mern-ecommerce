import React, { useEffect } from 'react'
import { selectLoggedInUser } from '../../component/auth/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategoriesAsync } from '../../component/categories/CategoriesSlice'
import { fetchLoggedInUserByIdAsync } from '../../component/user/UserSlice'

export const useFetchLoggedInUserDetails = (deps) => {
    
    const loggedInUser=useSelector(selectLoggedInUser)
    const dispatch = useDispatch();

    useEffect(()=>{
        /* when a user is logged in then this dispatches an action to get all the details of loggedInUser, 
        as while login and signup only the bare-minimum information is sent by the server */
        if(deps && loggedInUser?.isVerified){
          dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id))
          dispatch(fetchAllCategoriesAsync())
        }
    },[deps])
}
