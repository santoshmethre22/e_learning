import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../main.jsx";

const UserContext = createContext();

export const UsercontextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const loginUser = async ({ email, password, navigate }) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

     
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
      setBtnLoading(false);
      navigate("/");

    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };


  const register = async ({name, email, password, navigate }) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

    
        toast.success("Login successful!");
        localStorage.setItem("activationToken", data.activationToken);
        setUser(data.user);
        
      setBtnLoading(false);
      navigate("/verify");

    } catch (error) {
      setBtnLoading(false);
    
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const verifyUser=async({otp,navigate})=>{

     try {  

      setBtnLoading(true)

      const activationToken=localStorage.getItem("activationToken");

      const {data}=await axios.post(`${server}/api/user/verify`,{
        otp,
        activationToken
      })


      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
      
     } catch (error) {

      toast.error(error.response.data.message);
      setBtnLoading(false);
      
     }


  }

  return (
    <UserContext.Provider 
    value={{ 
      user,
       isAuth, 
      btnLoading, 
      loginUser,
      register,
      verifyUser

    }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const userData = () => useContext(UserContext);
