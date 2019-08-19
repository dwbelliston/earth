import React from "react";
import "./loader-button.scss";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) => (
  <button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <i className="fas fa-adjust spinning" />}
    {!isLoading ? text : loadingText}
  </button>
);
