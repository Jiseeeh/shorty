import React from "react";

import { minStep, maxStep } from "../constants/constants";

interface FormButtonNavigationProps {
  step: number;
  isLoading: boolean;
  prevStep: () => void;
  nextStep: () => void;
  onSubmit: () => void;
}

const FormButtonNavigation: React.FC<FormButtonNavigationProps> = ({
  step,
  isLoading,
  prevStep,
  nextStep,
  onSubmit,
}) => {
  return (
    <section className="my-3 flex gap-3">
      {step > minStep ? (
        <button className="btn" onClick={prevStep}>
          Prev
        </button>
      ) : (
        ""
      )}
      {step < maxStep ? (
        <button className="btn" onClick={nextStep}>
          Next
        </button>
      ) : (
        ""
      )}
      {step === maxStep ? (
        <button
          className={`btn ${isLoading ? "loading btn-disabled" : ""}`}
          onClick={onSubmit}
        >
          Submit
        </button>
      ) : (
        ""
      )}
    </section>
  );
};

export default FormButtonNavigation;
