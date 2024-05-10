import React, {useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  }
  
  const handleMailChange = (e) => {
    setUserMail(e.target.value);
  }

  const handlePassChange = (e) => {
    setUserPass(e.target.value);
  }
  const login = () => {
    navigate("/Login");
  }
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const data = {
      name: userName,
      mail: userMail,
      pass: userPass,
    };

    console.log(data);
    axios.post(`http://localhost:5000/Login/register/`, data)
      .then((val) => {
        enqueueSnackbar(val.data.message, { variant: "success" });
        navigate("/Login");
        window.location.reload();
      })
      .catch((error) => {
        enqueueSnackbar("Алдаа гарлаа! : " + error.response.data.message, { variant: "error" });
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Maa Post Web</span> 
        <span className="title">Бүртгүүлэх</span>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Хэрэглэгчийн нэр"
            autoFocus
            pattern="[A-Za-z0-9]+"
            value={userName}
            onChange={handleNameChange}
            onInvalid={(e) =>
              e.target.setCustomValidity(
                "Please enter only alphabets and numbers"
              )
            }
          />
          <input type="email" placeholder="Э-Мэйл хаяг" value={userMail} onChange={handleMailChange} required />
          <input type="password" placeholder="Нууц үг" value={userPass} onChange={handlePassChange} required />
          {/* <label htmlFor="file">
              <img src="https://cdn-icons-png.flaticon.com/128/6632/6632582.png" />{" "}
            <span>Add Avatar</span>
          </label> */}
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept=".jpg, .png"
          />
          <button>Sign up</button>
        </form>
        <p>
          Та бүртгэлтэй хэрэглэгч үү? <span onClick={login}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;