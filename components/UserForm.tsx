import React, { useState, useEffect } from "react";
import Link from "next/link";

import AlreadyLoggedIn from "./AlreadyLoggedIn";
import { inputLength } from "../constants/constants";

interface UserFormProps {
  formType: "Login" | "Sign up";
  isLoading: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => void;
}

const UserForm: React.FC<UserFormProps> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // effect for checking if the user is logged in.
  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");

    if (userInfo) setIsLoggedIn(true);
  }, [isLoggedIn]);

  if (isLoggedIn) return <AlreadyLoggedIn />;

  return (
    <form
      className="form-control  max-w-xs md:w-full"
      onSubmit={(e) => {
        props.handleSubmit(e, username, password);
      }}
    >
      <h1 className="text-4xl font-bold text-center">{props.formType}</h1>
      <label className="label">
        <span className="label-text">Username</span>
      </label>
      <input
        type="text"
        placeholder="Jiseeeh6"
        className="input input-bordered w-full max-w-xs"
        value={username}
        onChange={onUsernameChange}
        minLength={inputLength.min}
        maxLength={inputLength.max}
      />
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder=""
        className="mb-3 input input-bordered w-full max-w-xs"
        value={password}
        onChange={onPasswordChange}
        minLength={inputLength.min}
        maxLength={inputLength.max}
      />
      <Link
        className="mb-2 link link-accent"
        href={props.formType === "Sign up" ? "/login" : "/signUp"}
      >
        {props.formType === "Sign up" ? "Login" : "Sign up"}
      </Link>
      <Link className="mb-2 link link-accent" href="/passwordReset">
        Forgot password
      </Link>
      <button
        className={`btn hover:btn-success ${
          props.isLoading ? "btn-disabled" : ""
        }`}
      >
        {props.formType}
      </button>
    </form>
  );
};

export default UserForm;
