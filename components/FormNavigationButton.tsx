import React from "react";

interface FormButtonNavigationProps {
  step: number;
  minStep: number;
  maxStep: number;
  prevStep: () => void;
  nextStep: () => void;
}

const FormButtonNavigation: React.FC<FormButtonNavigationProps> = ({
  step,
  minStep,
  maxStep,
  prevStep,
  nextStep,
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
    </section>
  );
};

export default FormButtonNavigation;
