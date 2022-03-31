// SignUp.js

// TODO: POST new user

import styled from "styled-components";
import { useState, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);

  // create a reference for each input to store the values
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  // check if all inputs are filled--if true, enable Sign Up button
  const handleChange = (ev) => {
    if (password.current.value !== confirmPassword.current.value) {
      // console.log("Passwords don't match");

      // we need a return to end the function if the passwords don't match
      return;
    }
    if (
      firstName.current.value.length > 0 &&
      lastName.current.value.length > 0 &&
      email.current.value.length > 0 &&
      password.current.value.length > 0 &&
      confirmPassword.current.value.length > 0
    ) {
      setDisabled(false);
    }
    // if all inputs are valid, setValid(true)
    setValid(true);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (valid) {
      const user = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      };
      console.log(user);
    }
  };

  return (
    <Wrapper>
      <div>Welcome to LesMontres</div>
      <SignUpForm>
        <FirstName
          type="text"
          name="first-name"
          required
          placeholder="First Name"
          ref={firstName}
          onChange={handleChange}
        ></FirstName>
        <LastName
          type="text"
          name="last-name"
          required
          placeholder="Last Name"
          ref={lastName}
          onChange={handleChange}
        ></LastName>

        <Email
          type="email"
          name="email"
          required
          placeholder="E-mail"
          ref={email}
          onChange={handleChange}
        ></Email>

        <Password
          type="password"
          name="password"
          required
          placeholder="Password"
          ref={password}
          onChange={handleChange}
        ></Password>
        {/* Show/hide eye icon */}
        <ConfirmPassword
          type="password"
          name="confirm-password"
          required
          placeholder="Confirm Password"
          ref={confirmPassword}
          onChange={handleChange}
        ></ConfirmPassword>

        <SignUpBtn
          type="submit"
          onClick={(ev) => handleSubmit(ev)}
          disabled={disabled}
        >
          Sign Up
        </SignUpBtn>

        <div>
          Already have an account?
          <div>Log In instead</div>
          <div>Logo icon</div>
        </div>
      </SignUpForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  /* font-family: Poppins; */
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const FirstName = styled.input``;
const LastName = styled.input``;
const Email = styled.input``;
const Password = styled.input``;
const ConfirmPassword = styled.input``;

const SignUpBtn = styled.button`
  background-color: red;
  ${({ disabled }) =>
    disabled
      ? `
      cursor: not-allowed;
      opacity: 0.5;
      `
      : `
      cursor: pointer;
  `};
`;

export default SignUp;
