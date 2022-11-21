import React from "react";
import axios from "axios";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import UserForm from "../components/UserForm";

const SignUp: React.FC = () => {
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

    const response = await axios.post("/api/sign-up", userInfo);

    if (response.data.success) {
      toast.success("Sign up success!");
      router.push("/login");
      return;
    }

    toast.error("Username is already taken!");
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta
          name="description"
          content="Sign up page for shorty. URL shortener free sign up."
        />
      </Head>
      <UserForm formType="Sign up" handleSubmit={handleSubmit} />
    </>
  );
};

export default SignUp;
