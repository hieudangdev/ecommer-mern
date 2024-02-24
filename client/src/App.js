/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import router from "./router";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="bg-stone-950 min-h-screen">
      <header className="bg-black text-white p-4 flex justify-between">
        <h1>Ứng dụng quản lý</h1>
        <nav>
          {currentUser ? (
            <Link to="/manager-user" className="mr-4">
              Quản lý người dùng
            </Link>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Đăng nhập
              </Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default App;
