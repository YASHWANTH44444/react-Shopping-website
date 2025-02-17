import React from 'react'
import UseFetch from './Custom-hook/useFetch'

const Home = () => {

  let {products} = UseFetch("https://fakestoreapi.com/products")
  return (
    <div>
      <h1>Home -Total products {products.length}</h1>
    </div>
  )
}

export default Home