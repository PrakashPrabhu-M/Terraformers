import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import requests from "../../requests";

const LoginPage = (props) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const req = requests.init();
      const token = await req.login(loginData);
      window.localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [key]: value });
  };

  return (
    <form {...props}>
      <label>Username: </label>
      <input
        type="text"
        name="username"
        onChange={changeHandler}
        value={loginData.username}
      />{" "}
      <br />
      <label>Password: </label>
      <input
        type="password"
        name="password"
        onChange={changeHandler}
        value={loginData.password}
      />{" "}
      <br />
      <Link to="/register">Register</Link>
      <button onClick={loginHandler}>Login</button>
    </form>
  );
};

export default LoginPage;
