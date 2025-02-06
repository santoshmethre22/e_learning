import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { userData } from '../../../context/User.context.jsx';
const Register = () => {

    const navigate = useNavigate();
    const { btnLoading, register } = userData();
    
    const [name,setName]=useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault();
        await register({ name,email, password, navigate });
      };
    

    return (
        <div>
        <h2>Register User</h2>
    
        <form  onSubmit={submitHandler} action="">
    
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text   "
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
    
            <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
    
            <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

            <button type='submit'>register</button>

        </form>
    
        <h2> do you have an account  <Link to='/login'> Login </Link></h2>
      
    </div>
      )
}

export default Register





