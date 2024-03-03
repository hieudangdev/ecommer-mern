import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      name,
    };

    await axios
      .post("http://localhost:8080/api/auth/register", data)
      .then((response) => {
        if (response.data.success) {
          // Lưu trữ thông tin người dùng
          console.log("Register Successfull", response.data);
          // Chuyển hướng đến trang chủ
          navigate("/");
        } else {
          setLoginError(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError("Đăng nhập thất bại!");
      });
  };

  return (
    <div className="container bg-black text-white rounded-xl shadow mt-10 mx-auto max-w-sm p-4 ">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center">Đăng ký</h1>
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
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full p-3 mb-4 border text-gray-950 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className=" p-3 text-md font-bold text-white border border-stone-800 rounded-lg hover:bg-stone-900"
        >
          Đăng ký
        </button>
      </form>
      {loginError && (
        <span className="text-red-500 text-center">{loginError}</span>
      )}
      <p className="text-center mt-4">
        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default Register;
