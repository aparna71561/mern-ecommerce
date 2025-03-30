import React from 'react'
import { Navbar } from '../component/navbar/Navbar'
import { ProductDetails } from '../component/products/components/ProductDetails'
import { Footer } from '../component/footer/Footer'

export const ProductDetailsPage = () => {
  return (
    <>
    <Navbar/>
    <ProductDetails/>
    <Footer/>
    </>
  )
}
