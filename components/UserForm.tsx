import React, { useState } from "react";

interface UserFormProps {
  formType: "Login" | "Sign up";
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => void;
}

const UserForm: React.FC<UserFormProps> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const inputLength = {
    min: 8,
    max: 12,
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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
        placeholder="Jiseeeh"
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
      <button className="btn hover:btn-success">{props.formType}</button>
    </form>
  );
};

export default UserForm;
