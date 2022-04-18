import React from "react";
import styles from "./FormInput.module.scss";

const FormInput = (props) => {
  const { label, type = "text", name, value, placeholder, onChange } = props;
  return (
    <div>
      <label>{label}</label>
      <input
        className={styles.formInput}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
