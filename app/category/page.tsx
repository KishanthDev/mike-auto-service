import Categories from '@/components/CategoryPage'
import React from 'react'
import SidebarLayout from '../subcategory/layout'

const page = () => {
  return (
    <div>
        <SidebarLayout>
        <Categories/>
        </SidebarLayout>
       
    </div>
  )
}

export default page