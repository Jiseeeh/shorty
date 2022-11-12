import React from "react";

import UserForm from "../components/UserForm";

const SignUp: React.FC = () => {
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
      <UserForm formType="Sign up" handleSubmit={handleSubmit} />
    </>
  );
};

export default SignUp;
