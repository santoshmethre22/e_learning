import React from 'react'
import { Navigate ,useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();

  return (
    <div>

        <h1> welcom </h1>
        <button onClick={()=>navigate('/courses')}>Get Started</button>     
    </div>
  )
}

export default Home
