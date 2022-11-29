import React from "react";

import IResetForm from "../../interfaces/IResetForm";
import { inputLength } from "../../constants/constants";

interface ConfirmIdentityProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: IResetForm;
}

const ConfirmIdentity: React.FC<ConfirmIdentityProps> = ({
  onChange,
  values,
}) => {
  return (
    <section className="form-control">
      <label className="label">
        <span className="label-text">Domain of the link you shortened.</span>
      </label>
      <input
        type="text"
        className="input input-bordered"
        placeholder="facebook"
        name="domainName"
        value={values.domainName}
        onChange={onChange}
        autoComplete="off"
        spellCheck="false"
        maxLength={inputLength.max}
      />
      <label className="label">
        <span className="label-text">
          <span className="font-bold">NOTE:</span> It must exist in your
          account.
        </span>
      </label>
    </section>
  );
};

export default ConfirmIdentity;
