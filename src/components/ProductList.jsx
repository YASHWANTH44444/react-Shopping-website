import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {BlinkBlur} from 'react-Loading-indicators'
import UseFetch from './Custom-hook/useFetch';
import { FaCartPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import {useDispatch,useSelector} from "react-redux"
import {addItem} from "../store/cartSlice"




const ProductList = () => {

 let navigate = useNavigate()
  // let [products,setProducts] = useState([])
  // let [error,setError] = useState("")
  // let [isLoading,setIsLoading] = useState(true)
  // useEffect( ()=> {
  //    fetch("http://localhost:4001/Products",{method:"GET"})
  //    .then((response)=>{
  //     if(response.ok){
  //       return response.json()
  //     }
  //     else{
  //        throw new Error ("search proper data")
  // }})
        
      
  //    .then((data)=>{setProducts(data);})
  //    .catch ( (error)=> {
  //     setError(error.message);
      
  //   })
  //   .finally(()=>{
  //     setIsLoading(false)
  //   })
  // }, []);

  let {products,error,isLoading,setProducts}= UseFetch("http://localhost:5001/Products")

  let handleDelete = (id)=> {
     axios.delete (`http://localhost:5001/Products/${id}`)
     .then( ()=> {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
     })
     let newProductsList = products.filter(product=> product.id !== id )


     setProducts(newProductsList)

  }


  let dispatch = useDispatch()
  let cartState = useSelector( (state)=> {return state.cart})
  let addItemToCart = (product)=>{
    let checkProduct = cartState.some(cartProduct => cartProduct.id === product.id)

    if(!checkProduct){

      dispatch(addItem(product))
      Swal.fire({
        title: "Success",
        text: "Product Added Successfully",
        icon: "success"
      })
    }
    else{
      Swal.fire({
        title: "Oops",
        text: "Product Already Added",
        icon: "error",
        footer:"<p>add  some other product</p>"
      })
      
      
    }


  }


  
  
if(isLoading){
return<div>
  <center>

  <BlinkBlur color="#201220" size="large" text="Loading" textColor="#7dd976" />
  </center>
</div>
}
else{
  return (
    <div>
      <article>
        <span> To Create New Product</span>
        <Button onClick={ ()=> navigate("/newProduct")}>Click Me!</Button>
      </article>
      <h1>Product List</h1>
      {products.length !==0 && (

         <section className="Products">
          {
            products.map((product)=>(
              <Card key={products.id} style={{ width: '18rem' }} className="product">
                <center>

             
              <Card.Img variant="top" src= { product.image} style={{width : " 9rem", height :"12rem"}} />
                </center>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text  >
                ${product.price}
                </Card.Text>
              
              </Card.Body>
              <Card.Footer style={{display:"flex",justifyContent:"space-evenly,",alignItems:"center"}}>
                <Card.Text >
                 
                </Card.Text>
              <Button variant="primary" onClick = { ()=>addItemToCart(product)}> < FaCartPlus/></Button>
              <Button variant='secondary' onClick={ ()=>{ navigate(`/update/${product.id}`)}}> <FaEdit/> </Button>
              <Button  variant='danger'  onClick={ ()=> handleDelete(product.id)}>  <MdDelete/> </Button>
              </Card.Footer>
            </Card>
            ))
          }
         </section>
      )}

         {
          error && <p>{error}</p>
         }
      </div>
  )
}
}


export default ProductList