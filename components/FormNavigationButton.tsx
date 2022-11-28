import React from "react";

import { minStep, maxStep } from "../constants/constants";

interface FormButtonNavigationProps {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FormButtonNavigation: React.FC<FormButtonNavigationProps> = ({
  step,
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
        <button className="btn" onClick={onSubmit}>
          Submit
        </button>
      ) : (
        ""
      )}
    </section>
  );
};

export default FormButtonNavigation;
