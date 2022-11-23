import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";

import UserForm from "../components/UserForm";

const Login: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    setIsLoading(true);
    const toastId = toast.loading("Logging you in...");

    const response = await axios.post("/api/login", userInfo);

    if (response.data.success) {
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.success("Login success!");

      sessionStorage.setItem("userInfo", JSON.stringify(response.data.user));

      router.push("/shorties");
      return;
    }

    setIsLoading(false);
    toast.dismiss(toastId);
    toast.error("Wrong credentials!");
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page for shorty." />
      </Head>
      <UserForm
        formType="Login"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default Login;
