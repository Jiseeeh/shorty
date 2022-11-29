import React from "react";

import IResetForm from "../../interfaces/IResetForm";
import { inputLength } from "../../constants/constants";

interface UserDetailsProps {
  values: IResetForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ values, onChange }) => {
  return (
    <section className="form-control">
      <label className="label">
        <span className="label-text">Username</span>
      </label>
      <input
        type="text"
        className="input input-bordered"
        placeholder="Jiseeeh6"
        name="username"
        value={values.username}
        onChange={onChange}
        autoComplete="off"
        minLength={inputLength.min}
        maxLength={inputLength.max}
      />
    </section>
  );
};

export default UserDetails;
