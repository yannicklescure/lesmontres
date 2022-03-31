// SignUp.js

// POST new user

import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory(); // ??? put in hooks folder?

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <Wrapper>
      <div>Welcome to LesMontres</div>
      <SignUpForm>
        <FirstName
          type="text"
          name="first-name"
          required
          value={firstName}
          placeholder="First Name"
          onChange={(ev) => setFirstName(ev.target.value)}
        ></FirstName>
        <LastName
          type="text"
          name="last-name"
          required
          value={lastName}
          placeholder="Last Name"
          onChange={(ev) => setLastName(ev.target.value)}
        ></LastName>

        <Email
          type="email"
          name="email"
          required
          value={email}
          placeholder="E-mail"
          onChange={(ev) => setEmail(ev.target.value)}
        ></Email>

        <Password
          type="password"
          name="password"
          required
          value={password}
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
        ></Password>
        {/* Show/hide eye icon */}
        <ConfirmPassword
          type="password"
          name="confirm-password"
          required
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(ev) => setConfirmPassword(ev.target.value)}
        ></ConfirmPassword>

        {/* if (required inputs) */}
        <SignUpBtn type="submit" value="Sign Up" onSubmit={handleSubmit} />
        <DisabledSignUpBtn type="submit" value="Sign Up" disabled />

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
const Username = styled.input``;
const Email = styled.input``;
const Password = styled.input``;
const ConfirmPassword = styled.input``;
const SignUpBtn = styled.input`
  /* background-color: red; */
`;
const DisabledSignUpBtn = styled.input`
  /* background-color: blue; */
`;

export default SignUp;
