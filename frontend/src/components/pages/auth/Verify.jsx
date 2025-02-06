import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { userData } from '../../../context/User.context.jsx'

const Verify = () => {

    const [otp,setOtp]=useState();
    const {btnLoading,verifyUser}=userData();
    const navigate=useNavigate();

    const submitHandler=async(e)=>{
      e.prevetnDefault();

      await verifyUser(Number(otp),navigate);

    }

  return (
    <div>
      <h2>verify user </h2>
      <form onSubmit={submitHandler}>

        <label htmlFor="otp">otp</label>
        <input 
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        type='number'  required/>


        <button type=' submit'>verify</button>
      </form>
      <p>go to <Link to='/login'> Login</Link></p>
        
    </div>
  )
}

export default Verify
