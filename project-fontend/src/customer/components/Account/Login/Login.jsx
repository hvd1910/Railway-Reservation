import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../../../../config/apiConfig"
import { ToastSuccess, ToastError } from "../../../../Admin/component/ToastNotification/Toast";

const Login = () => {

  const navigate = useNavigate();
  
  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [user, setUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputobj = {
      email: email,
      password: password,
    };


    try {
      const fetchPost = async () => {
        try {
          const res = await axios.post(
            `${API_BASE_URL}/api/Authorize/GenerateToken`,
            inputobj
          );
          if(res.data.status === "error") {           
            ToastError(res.data)
          }else {
            
            ToastSuccess("Sign In")
            setTimeout(() => {
              setUser(res.data);
            }, 2000);
          }
        } catch {
          ToastError("error")
        }
      };
      fetchPost();
    } catch {
      ToastError("error")
    }
  };

  if (user !== '') {
    localStorage.setItem("jwt", user.jwt);
    localStorage.setItem("role", user.role);
    localStorage.setItem("email", email);
    navigate('/admin/')
  }



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center ">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold ">
              <span className="text-violet-500">Admin</span>
              Dashboard
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-violet-500 mb-2">
                Sign in to Account
              </h2>
              <div className="border-2 w-10 border-violet-500 inline-block mb-2"></div>

              <div className="flex justify-center my-2">
                <p className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebookF className="text-sm" />
                </p>
                <p className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaLinkedinIn className="text-sm" />
                </p>
                <p className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-sm" />
                </p>
              </div>
              <p className="text-gray-400 my-3">or use your email account</p>

              <form onSubmit={handleSubmit}  className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    onChange={(e) => emailupdate(e.target.value)}
                    value={email}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    required
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    onChange={(e) => passwordupdate(e.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    required
                  />
                </div>

                <button type="submit" className="border-2 border-violet-500 text-violet-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-violet-500 hover:text-white mt-4">
                  Sign In
                </button>
              </form>
            </div>
          </div>

          <div className="w-2/5 bg-violet-500 text-white rounded-tr-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Fill up personal</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
