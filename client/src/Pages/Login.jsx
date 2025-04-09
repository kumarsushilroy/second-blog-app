import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {TailSpin} from 'react-loader-spinner'
import { useDispatch } from "react-redux";
import { showloading, hideloading } from "../Redux/Feature";
import { Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const obj = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showloading());

    let loginUser = await fetch("http://localhost:4000/login/user", {
      method: "post",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });
    loginUser = await loginUser.json();
    // console.log(loginUser)
    localStorage.setItem("user", JSON.stringify(loginUser));
    dispatch(hideloading());
    if (loginUser.token) {
      localStorage.setItem("token", loginUser.token);
      navigate("/");
    } else {
      alert("user not found !");
    }
  };

  return (
    <div className="mt-10 ml-10">
      <div className="border w-[400px] p-6  mx-auto mt-40 bg-yellow-300">
        <form onSubmit={handleSubmit} >
          <h1 className="text-center font-bold font-mono text-5xl text-green-400">
            Login plz
          </h1>
     
          <div className="my-3">
            <input
              type="text"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
              className="w-full border-b outline-none p-2"
            />
          </div>

          <div className="my-3">
            <input
              type="text"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              className="w-full border-b outline-none p-2"
            />
          </div>

<div className="flex items-center gap-5 ">
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-purple-500 text-white rounded"
          >
            Login
          </button>
          <span className="flex items-center mt-3 gap-2">
            <p>not a user?</p>
            <Link className="underline " to={'/register'}>Register</Link>
          </span>
          
          </div>
        </form>
      </div>

     
    </div>
  );
};

export default Login;
