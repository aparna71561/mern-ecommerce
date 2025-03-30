import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../component/auth/AuthSlice'
import ProductSlice from '../component/products/ProductSlice'
import UserSlice from '../component/user/UserSlice'
import CategoriesSlice from '../component/categories/CategoriesSlice'
import BrandSlice from '../component/brands/BrandSlice'

export const store=configureStore({
    reducer:{
        AuthSlice,
        ProductSlice,
        UserSlice,
        CategoriesSlice,
        BrandSlice,
    }
})