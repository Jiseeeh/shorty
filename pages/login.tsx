import React from "react";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import UserForm from "../components/UserForm";

const Login: React.FC = () => {
  const router = useRouter();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => {
    e.preventDefault();

    if (!username && !password) {
      toast.error("Please input properly!");
      return;
    }

    const userInfo = {
      name: username,
      password,
    };

    const toastId = toast.loading("Logging you in...");

    const response = await axios.post("/api/login", userInfo);

    if (response.data.success) {
      toast.dismiss(toastId);
      toast.success("Login success!");

      sessionStorage.setItem("userInfo", JSON.stringify(response.data.user));

      router.push("/shorties");
      return;
    }

    toast.error("Wrong credentials!");
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page for shorty." />
      </Head>
      <UserForm formType="Login" handleSubmit={handleSubmit} />
    </>
  );
};

export default Login;
