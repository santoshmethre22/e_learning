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

      if (data && data.token && data.user) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
      } else {
        toast.error("Login failed. Please try again.");
      }

      setBtnLoading(false);
      navigate("/");

    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <UserContext.Provider value={{ user, isAuth, btnLoading, loginUser }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const userData = () => useContext(UserContext);
