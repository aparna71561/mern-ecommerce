import React, { useEffect } from 'react'
import { Navbar } from '../component/navbar/Navbar'
import { ProductList } from '../component/products/components/ProductList'

import { useDispatch, useSelector } from 'react-redux'
import {Footer} from '../component/footer/Footer'

export const HomePage = () => {

  



  return (
    <>
    <Navbar isProductList={true}/>
    <ProductList/>
    <Footer/>
    </>
  )
}
