import React from "react";

import IResetForm from "../../interfaces/IResetForm";
import { inputLength } from "../../constants/constants";

interface PasswordResetProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: IResetForm;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ onChange, values }) => {
  return (
    <section className="form-control">
      <label className="label">
        <span className="label-text">New password</span>
      </label>
      <input
        type="password"
        className="input input-bordered"
        placeholder="New password"
        name="newPassword"
        value={values.newPassword}
        onChange={onChange}
        minLength={inputLength.min}
        maxLength={inputLength.max}
      />
      <label className="label">
        <span className="label-text">Confirm password</span>
      </label>
      <input
        type="password"
        className="input input-bordered"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={onChange}
        minLength={inputLength.min}
        maxLength={inputLength.max}
      />
    </section>
  );
};

export default PasswordReset;
