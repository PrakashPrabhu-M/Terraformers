import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import requests from "../../requests";

const RegisterPage = (props) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      if (confirmPassword !== registerData.password) {
        console.log(`Password and confirm password doesn't match`);
        return;
      }
      const req = requests.init();
      await req.register(registerData);
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === "confirmPassword") setConfirmPassword(e.target.value);
    else setRegisterData({ ...registerData, [key]: value });
  };

  return (
    <form {...props}>
      <label>Username: </label>
      <input
        name="username"
        onChange={changeHandler}
        value={registerData.username}
      />{" "}
      <br />
      <label>Email: </label>
      <input
        name="email"
        onChange={changeHandler}
        value={registerData.email}
      />{" "}
      <br />
      <label>Password: </label>
      <input
        name="password"
        onChange={changeHandler}
        value={registerData.password}
      />{" "}
      <br />
      <label>Confirm Password: </label>
      <input
        name="confirmPassword"
        onChange={changeHandler}
        value={confirmPassword}
      />{" "}
      <br />
      <Link to="/login">Login</Link>
      <button onClick={registerHandler}>Sign up</button>
    </form>
  );
};

export default RegisterPage;
