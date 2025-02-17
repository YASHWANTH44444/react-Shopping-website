import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import ProductList from './ProductList';

const Products = () => {
    
  return (
    <div>
       <ProductList/>
       <Outlet/>
    </div>
  )
}

export default Products