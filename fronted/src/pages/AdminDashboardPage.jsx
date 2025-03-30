import React from 'react'
import { Navbar } from '../component/navbar/Navbar'
import { AdminDashBoard } from '../component/admin/components/AdminDashBoard'

export const AdminDashboardPage = () => {
  return (
    <>
    <Navbar isProductList={true}/>
    <AdminDashBoard/>
    </>
  )
}
