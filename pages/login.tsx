import React from "react";

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
      <UserForm formType="Login" handleSubmit={handleSubmit} />
    </>
  );
};

export default Login;
