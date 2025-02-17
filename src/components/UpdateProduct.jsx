import React, { useEffect, useState } from 'react'
import {Button, Grid2, Paper, TextField, Typography} from "@mui/material"
import { useBlocker, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateProduct = () => {
    let paperStyle = {
        width: 400,
        margin : "20px auto",
        padding :"20px"
        
        
    }
    
      // {
        //   }
        
        let [updateProduct,setUpdateProduct]= useState(null)
        
        let {id} = useParams()

        let navigate= useNavigate()
    
        useEffect( ()=> {
          axios.get(`http://localhost:5001/Products/${id}`)
          .then( res => setUpdateProduct(res.data))
    
        },[] )
      
      let handleChange = (e) => {
        let {value,name} = e.target
        let fieldName = name.split("rating")[1]
    
        if(name.includes("rating.")){
            setUpdateProduct({
            ...updateProduct,
            rating:{
                ...updateProduct.rating,[fieldName]:value
            }
          })
    
        }
        else{
          
            setUpdateProduct({
        ...updateProduct,
        [name]:value
               })
              }
          
      }
      let handleUpdate = (e)=>{
        e.preventDefault()
        fetch(`http://localhost:5001/Products/${id}`,{
          method:"PUT",
          headers : {
            "content-Type": "application/json"
          },
          body : JSON.stringify(updateProduct)
        })
        .then( ()=> {
          alert("saved successfully")

          navigate("/products")
          setUpdateProduct({
          
         
            title: "",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
             rate: 0,
             count: 0,
            }
      
        })
        })
    
      }
     

      if(updateProduct!==null){

          return (
        
            <Paper elevation={20} style={paperStyle}>
              <Typography variant='h5' textAlign={'center'}>update new Product</Typography>
              <Grid2 component="form" style={{display:"grid", gap:"20px"}} onSubmit={handleUpdate}>
               <TextField value= {updateProduct.title}name="title" label="Title" variant="outlined" fullWidth onChange={handleChange} />
               <TextField value= {updateProduct.category}name="category" label="category" variant="outlined" fullWidth  onChange={handleChange}/>
               <Grid2 container spacing={2}>
                   <Grid2 size={6}>
                     <TextField value= {updateProduct.rate} name="rating.rate"  type='number' label="Rate" variant="outlined" onChange={handleChange}/>
                     </Grid2>
                   <Grid2 size={6}>
                     <TextField value= {updateProduct.count} name="rating.count"  type='number' label="Count" variant="outlined" onChange={handleChange} />
        
                   </Grid2>
        
               </Grid2>
             
               <Button type='submit' variant="contained" color='success' fullWidth>Save</Button>
        
              </Grid2>
        
            </Paper>
          )
        }
          else{
            <div>Loading</div>
          }
      
}

export default UpdateProduct