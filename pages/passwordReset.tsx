import React, { useState, lazy, Suspense } from "react";
import Head from "next/head";
import { toast } from "react-hot-toast";

import IResetForm from "../interfaces/IResetForm";
import PasswordResetForm from "../components/PasswordResetForm";
import ConfirmIdentity from "../components/ConfirmIdentity";
import FormButtonNavigation from "../components/FormNavigationButton";
import isFormValid from "../helper/isFormValid";
import { minStep, maxStep, inputLength } from "../constants/constants";

const ResetPassword: React.FC = () => {
  const [formValue, setFormValue] = useState<IResetForm>({
    step: 1,
    oldUsername: "",
    newPassword: "",
    confirmPassword: "",
    answer: "",
  });

  const prevStep = () => {
    if (formValue.step - 1 < minStep) return;

    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      step: prevFormValue.step - 1,
    }));
  };

  const nextStep = () => {
    if (formValue.step + 1 > maxStep) return;

    const { isValid, message } = isFormValid(formValue);

    if (!isValid) {
      toast.error(message);
      return;
    }

    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      step: prevFormValue.step + 1,
    }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const renderForm = () => {
    switch (formValue.step) {
      case 1:
        return (
          <>
            <form className="form-control" onSubmit={handleSubmit}>
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Old username"
                name="oldUsername"
                value={formValue.oldUsername}
                onChange={handleOnChange}
                autoComplete="off"
                minLength={inputLength.min}
                maxLength={inputLength.max}
              />
            </form>
          </>
        );
      case 2:
        return <ConfirmIdentity onChange={handleOnChange} values={formValue} />;
      case 3:
        return (
          <PasswordResetForm onChange={handleOnChange} values={formValue} />
        );
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <h1 className="text-4xl font-bold text-center">Password Reset</h1>
      {renderForm()}
      <FormButtonNavigation
        step={formValue.step}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </>
  );
};

export default ResetPassword;
