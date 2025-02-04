import React from 'react'
import {Link} from "react-router-dom"

const Verify = () => {
  return (
    <div>
      <h2>verify user </h2>
      <form action="">

        <label htmlFor="otp">otp</label>
        <input type='number'  required/>
        <button>verify</button>
      </form>
      <p>go to <Link to='/login'> Login</Link></p>
        
    </div>
  )
}

export default Verify
