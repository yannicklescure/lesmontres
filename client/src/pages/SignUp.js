// SignUp.js

// POST new user

import styled from "styled-components";
import { useState } from "react";

const SignUp = () => {
  return (
    <Wrapper>
      <div>Logo</div>
      <div>Welcome to LesMontres</div>
      <SignUpForm>
        <FirstName
          type="text"
          required
          value={givenName}
          placeholder="First Name"
            onChange={(ev) => setFirstName(ev.target.value)}
        ></FirstName>
        <LastName
          type="text"
          required
          value={lastName}
          placeholder="Last Name"
            onChange={(ev) => setLastName(ev.target.value)}
        ></LastName>
        <UserName
          type="text"
          required
          value={userName}
          placeholder="Username"
            onChange={(ev) => setUserName(ev.target.value)}
        ></UserName>
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
          placeholder="E-mail"
          onChange={(ev) => setPassword(ev.target.value)}
        ></Password>
        <DisabledButton
          type="submit"
          value="Confirm Reservation"
          disabled
        ></DisabledButton>
        <ConfirmResBtn
          type="submit"
          value="Confirm Reservation"
          onSubmit={handleSubmit}
        />
      </SignUpForm>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const SignUpForm = styled.form``;
const FirstName = styled.input``;
const LastName = styled.input``;
const UserName = styled.input``;
const Email = styled.input``;
const Password = styled.input``;
const ConfirmPassword = styled.input``;
const DisabledSubmitBtn = styled.input`
  /* background-color: blue; */
`;
const SubmitBtn = styled.input`
  /* background-color: red; */
`;

export default SignUp;
