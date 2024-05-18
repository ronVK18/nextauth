"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Success", response.data);
      toast('User Created Sucessfully')
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp Failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
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
            Username
          </label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
          />
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
            onClick={onSignUp}
            className="p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            disabled={buttonDisabled}
            >{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        </main>
      </div>
    </>
  );
}
