import type { FC, ReactNode } from "react";
import "./FormField.css";

interface IFormFieldProps {
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({ children, errorMessage }) => {
  const hasError = !!errorMessage;

  return (
    <div className={`form-field ${hasError ? "form-field--error" : ""}`}>
      {children}
      {errorMessage && (
        <span className="form-field__error-text">{errorMessage}</span>
      )}
    </div>
  );
};
