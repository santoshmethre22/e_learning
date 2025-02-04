import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div>
        <h2>Register User</h2>
    
        <form action="">
    
            <label htmlFor="name">Name</label>
            <input type="text" />
    
            <label htmlFor="email">Email</label>
            <input type="email" />
    
            <label htmlFor="password">Password</label>
            <input type="password" />
    
        </form>
    
        <h2> do you have an account  <Link to='/login'> Login </Link></h2>
      
    </div>
      )
}

export default Register





