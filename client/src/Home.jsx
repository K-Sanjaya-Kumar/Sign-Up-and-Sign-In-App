
import React, {useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  axios.defaults.withCredentials=true;
  useEffect(() => {

    axios.get('http://localhost:3001/home')
      .then(result => {
        console.log(result);
        if (result.data !== "success") {
          
        }

      })
      .catch(err => console.log(err))

  }, [])
  return (

    <div className='d-flex justify-content-center align-items-center vh-100 bg-info '>
      <h2>Home Component</h2>
    
     
    </div>
   
  )
}
