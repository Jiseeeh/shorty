import React from "react";

import IResetForm from "../interfaces/IResetForm";
import { inputLength } from "../constants/constants";

interface ConfirmIdentityProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: IResetForm;
}

const ConfirmIdentity: React.FC<ConfirmIdentityProps> = ({
  onChange,
  values,
}) => {
  return (
    <form className="form-control">
      <label className="label">
        <span className="label-text">Domain of your last shorty</span>
      </label>
      <input
        type="text"
        className="input input-bordered"
        placeholder="facebook"
        name="answer"
        value={values.answer}
        onChange={onChange}
        maxLength={inputLength.max}
      />
    </form>
  );
};

export default ConfirmIdentity;
