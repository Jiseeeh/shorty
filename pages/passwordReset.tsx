import React, { useState, lazy, Suspense } from "react";
import Head from "next/head";

import IResetForm from "../interfaces/IResetForm";
import PasswordResetForm from "../components/PasswordResetForm";
import FormButtonNavigation from "../components/FormNavigationButton";

const ResetPassword: React.FC = () => {
  const [formValue, setFormValue] = useState<IResetForm>({
    step: 1,
    oldUsername: "",
    newPassword: "",
    confirmPassword: "",
    answer: "",
  });

  const minStep = 1;
  const maxStep = 3;

  const prevStep = () => {
    if (formValue.step - 1 < minStep) return;

    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      step: prevFormValue.step - 1,
    }));
  };

  const nextStep = () => {
    if (formValue.step + 1 > maxStep) return;

    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      step: prevFormValue.step + 1,
    }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
    console.log(formValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const renderForm = () => {
    switch (formValue.step) {
      case 1:
        return (
          <>
            <Head>
              <title>Forgot Password</title>
            </Head>
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
              />
            </form>
          </>
        );
      case 2:
        return (
          <PasswordResetForm onChange={handleOnChange} values={formValue} />
        );
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Password Reset</h1>
      {renderForm()}
      <FormButtonNavigation
        step={formValue.step}
        minStep={minStep}
        maxStep={maxStep}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </>
  );
};

export default ResetPassword;
