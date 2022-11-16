import React from "react";
import Head from "next/head";

import UserForm from "../components/UserForm";

const Login: React.FC = () => {
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => {
    e.preventDefault();
    alert(username);
    alert(password);
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
