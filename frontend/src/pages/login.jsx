import React, { useState, useEffect,useContext } from "react";

import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  
  const { setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");

  const handleChange = (e) => {
    setUserMail(e.target.value);
  }

  const handlePassChange = (e) => {
    setUserPass(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const data = {
      mail: userMail,
      pass: userPass,
    };

    console.log(data);
    axios.post(`http://localhost:5000/Login/Login/`, data)
      .then((val) => {
        console.log(val.data.user);
        const userData = val.data.user;
        setUser(userData); 
        localStorage.setItem("userData", JSON.stringify(userData));
        enqueueSnackbar(val.data.message, { variant: "success" });
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        enqueueSnackbar("Алдаа гарлаа! : " + error.response.data.message, { variant: "error" });
        console.log(error);
      });
  };

  const register = () => {
    navigate("/Register");
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className='logo'>Maa Post Web</span>
        <span className='title'>Нэвтрэх</span>
        <form onSubmit={handleLogin}> 
          <input type="email" placeholder='Э-Мэйл хаяг' autoFocus value={userMail} onChange={handleChange} required />
          <input type="password" placeholder='Нууц үг' value={userPass} onChange={handlePassChange} required />
          <button type="submit">Log in</button>
        </form>
        <p>Та бүртгүүлээгүй бол бүртгүүлнэ үү! <span onClick={register}>Бүртгүүлэх</span> </p>
      </div>
    </div>
  )
}

export default Login;
