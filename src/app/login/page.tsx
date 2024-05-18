"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.warn("Login Successfully")
      router.push("/profile");
    } catch (error: any) {
      console.log("SignUp Failed");
      toast(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 
      
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl mb-2">{loading ? "Processing" : "SignUp"}</h1>
        <hr />
        <main className="flex flex-col items-center justify-center p-10 bg-zinc-900 border-2 border-gray-500 rounded-lg">
         
          <label className="text-xl mb-2" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none  focus:border-gray-600 text-black"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
          <label className="text-xl mb-2" htmlFor="username">
            Password
          </label>
          <input
            type="password"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
           <button
            onClick={onLogin}
            className="p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            disabled={buttonDisabled}
            >{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit SignUp page</Link>
        </main>
      </div>
    </>
  );
}
