// Login.js

// TODO:
// - NavLink to signup--add to modules?

import styled from "styled-components";
import { useState, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";

const Login = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);

  // create a reference for each input to store the values
  const email = useRef();
  const password = useRef();

  // check if all inputs are filled--if true, enable Sign Up button
  const handleChange = (ev) => {
    if (email.current.value.length > 0 && password.current.value.length > 0) {
      setDisabled(false);
    }
    // if all inputs are valid, setValid(true)
    setValid(true);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (valid) {
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      console.log(user);
    }
  };

  return (
    <Wrapper>
      <div>Welcome back to LesMontres</div>
      <SignUpForm>
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

        <LoginBtn
          type="submit"
          onClick={(ev) => handleSubmit(ev)}
          disabled={disabled}
        >
          Sign Up
        </LoginBtn>

        <div>
          Don't have an account?
          <SignUpLink>Sign Up</SignUpLink> here
          <div>
            <AiOutlineClockCircle />
          </div>
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
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const Email = styled.input``;
const Password = styled.input``;

const LoginBtn = styled.button`
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

const SignUpLink = styled.span``;

export default Login;
