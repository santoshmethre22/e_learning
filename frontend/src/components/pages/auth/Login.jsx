import React from 'react'
import {Navigate,Link} from "react-router-dom"

const Login = () => {
  return (
    <div>
      <h2>
        Login
      </h2>

      <form   action="">
        
        <label htmlFor="email">Email</label>
        <input type='email' required/>
       
        <label htmlFor="email">Email</label>
        <input type='email'  required />

        <button>Login</button>

      </form>
      <h2>don't have an account? <Link to='/register'>Register</Link></h2>
    </div>
  )
}

export default Login
