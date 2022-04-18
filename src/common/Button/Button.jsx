import React from "react";
import styles from "./Button.module.scss";
// console.log(styles);


const buttonVariant = {
  default: styles.btnDefault,
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  success: styles.btnSuccess,
  warning: styles.btnWarning,
  danger: styles.btnDanger,
};
const buttonSize = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};


const Button = ({
  variant = "default",
  color,
  size = "sm",
  type,
  children,
  onClick,
  disabled
}) => {

  return (
    <button
      className={`${styles.btn} ${buttonVariant[variant]} ${buttonSize[size]} `}
      // variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children || "Button"}
    </button>
  );
};

export default Button;
