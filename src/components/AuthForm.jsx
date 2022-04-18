import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import FormInput from "../common/Form/FormInput/FormInput";
import { loginUserRequest, registrationUserRequest } from "../redux/sagas/auth";

const AuthForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoginForm
      ? dispatch(loginUserRequest({ ...form }))
      : dispatch(registrationUserRequest({ ...form }));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>{showLoginForm ? "SIGN IN" : "SIGN UP"}</h3>
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          placeholder="Enter email"
          onChange={handleFormChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleFormChange}
        />
        <Button type="submit" color="success">
          {showLoginForm ? "Log In" : "Register"}
        </Button>
        <span onClick={() => setShowLoginForm(!showLoginForm)}>
          {showLoginForm
            ? "New user? Create account"
            : " Have account? Sign in"}
        </span>
      </Form>
    </>
  );
};

export default AuthForm;
