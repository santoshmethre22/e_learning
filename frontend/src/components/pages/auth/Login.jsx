import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { userData } from '../../../context/User.context.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = userData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser({ email, password, navigate });
  };

  return (
    <div>
      <h2>Login - User</h2>

      <form onSubmit={submitHandler}>
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

        <button disabled={btnLoading} type="submit">
          {btnLoading ? "Please wait..." : "Login"}
        </button>
      </form>

      <h2>Don't have an account? <Link to="/register">Register</Link></h2>
    </div>
  );
};

export default Login;
