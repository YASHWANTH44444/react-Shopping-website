import { useEffect, useState } from "react"
import axios from "axios"
function UseFetch (url){
      let [products,setProducts] = useState([])
      let [error,setError] = useState("")
      let [isLoading,setIsLoading] = useState(true)

      useEffect(()=>{
        let fetchapi = async()=>{
            try{
                // let response = await fetch(url)
                let response = await axios.get(url)

                // if(response.ok){

                //     let data = await response.json()

                  

                //     setProducts(data)
                // }
                // else{
                //     throw new Error("data not found")
                // }

                setProducts(response.data)

            }
            catch(error){
                setError(error.message)

            }
            finally{
                setIsLoading(false)

            }
        }

       fetchapi()
      },[]

      )
      return{products,error,isLoading,setProducts}

}

export default UseFetch