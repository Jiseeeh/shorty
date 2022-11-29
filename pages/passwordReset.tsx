import React, { useState, lazy, Suspense } from "react";
import Head from "next/head";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import IResetForm from "../interfaces/IResetForm";
import UserDetails from "../components/form-steps/UserDetails";
import ConfirmIdentity from "../components/form-steps/ConfirmIdentity";
import PasswordReset from "../components/form-steps/PasswordReset";
import FormButtonNavigation from "../components/FormNavigationButton";
import isFormValid from "../helper/isFormValid";
import { minStep, maxStep } from "../constants/constants";

const ResetPassword: React.FC = () => {
  const [formValue, setFormValue] = useState<IResetForm>({
    step: 1,
    username: "",
    newPassword: "",
    confirmPassword: "",
    domainName: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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

  const handleSubmit = async () => {
    const { isValid, message } = isFormValid(formValue);

    if (!isValid) {
      toast.error(message);
      return;
    }

    // indicators
    setIsLoading(true);
    const toastId = toast.loading("Checking your information...");

    const response = await axios.patch("/api/password-reset", formValue);
    const responseMessage = await response.data.message;

    toast.dismiss(toastId);

    if (response.data.success) {
      toast.success(responseMessage);
      router.push("/login");
    } else toast.error(responseMessage);

    setIsLoading(false);
  };

  const renderForm = () => {
    switch (formValue.step) {
      case 1:
        return <UserDetails onChange={handleOnChange} values={formValue} />;
      case 2:
        return <ConfirmIdentity onChange={handleOnChange} values={formValue} />;
      case 3:
        return <PasswordReset onChange={handleOnChange} values={formValue} />;
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
        isLoading={isLoading}
        nextStep={nextStep}
        prevStep={prevStep}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ResetPassword;
