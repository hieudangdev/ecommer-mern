import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../customHook/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data && response) {
          // Chuyển hướng đến trang chủ
          setAuth({
            ...auth,
            user: response.data.user,
            token: response.data.token,
          });
          setLoginError("Login Successful");
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
