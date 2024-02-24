import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  async function callApi(data) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Chuyển hướng đến trang chủ
          navigate("/");
        } else {
          response.json().then((errorData) => {
            setLoginError(errorData.message);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError("Đăng nhập thất bại!");
      });
    return res;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    callApi(data);
    console.log(data);

    try {
    } catch (error) {}
  };

  return (
    <div className="container bg-black text-white  shadow rounded-xl mt-10 mx-auto max-w-sm p-4">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center">Đăng nhập</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border text-gray-950 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border text-gray-950 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className=" p-3 text-md font-bold text-white border border-stone-800 rounded-lg hover:bg-stone-900"
        >
          Đăng nhập
        </button>
      </form>
      {loginError && (
        <span className="text-red-500 text-center">{loginError}</span>
      )}
      <p className="text-center mt-4">
        Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
};

export default Login;
