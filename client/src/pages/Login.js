import styled from "styled-components";
import { useState, useRef, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import { BsSmartwatch } from 'react-icons/bs';
import { UserContext } from "../contexts/UserContext";
import Loading from "../components/Loading";
import ErrorMsg from "../components/ErrorMsg";

const SignUp = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    state: {
      status
    },
    actions: {
      loadingUser,
      logoutUser,
      receivedUserFromServer,
      errorFromServerUser,
    }
  } = useContext(UserContext);

  // create a reference for each input to store the values
  const email = useRef();
  const password = useRef();

  // check if all inputs are filled--if true, enable Sign Up button
  const handleChange = (ev) => {
    if (
      email.current.value.length > 3 &&
      password.current.value.length > 3
    ) {
      setDisabled(false);
    }
    // if all inputs are valid, setValid(true)
    setValid(true);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (valid) {
      const formData = {
        email: email.current.value,
        password: password.current.value,
      };
      console.log(formData);
      loadingUser();
      fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 200) {
            receivedUserFromServer({user: json.data});
            // Go to homepage
            history.push('/');
          }
          else {
            setErrorMessage(json.message);
            setValid(false);
            setDisabled(true);
            logoutUser();
          }
        })
        .catch((err) => {
          console.error(err);
          errorFromServerUser({message: 'An unknown error has occurred'});
        });
    }
  };

  return (
    <Wrapper>
      <StyledLogo><BsSmartwatch /></StyledLogo>
      <Title>Login to Les montres</Title>
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
        <LoginBtn
          type="submit"
          onClick={(ev) => handleSubmit(ev)}
          disabled={disabled}
        >
          { status === "loading-user" ? <Loading size="18" /> : 'Login' }          
        </LoginBtn>
      </SignUpForm>

      <StyledInfo>New to Les montres? <LoginLink to="/signup">Create an account.</LoginLink></StyledInfo>
      { errorMessage && <ErrorMsg message={errorMessage} width="336px" setMessage={setErrorMessage} /> }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 16px;
`;

const StyledLogo = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 24px;
  color: ${COLORS.dark};
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.light};
  border: 1px solid ${COLORS.grey};
  padding: 16px;
  border-radius: 4px;
  width: 336px;
`;

const StyledInfo = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
  width: 336px;
  background-color: ${COLORS.light};
  border: 1px solid ${COLORS.grey};
  padding: 16px;
  border-radius: 4px;
`;

const StyledInput = styled.input`
  border: 1px solid ${COLORS.grey};
  margin-bottom: 12px;
`;

const Email = styled(StyledInput)``;
const Password = styled(StyledInput)``;

const LoginBtn = styled.button`
  border: none;
  background-color: ${COLORS.purple};
  color: ${COLORS.light};
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 12px;

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

const LoginLink = styled(NavLink)``;

export default SignUp;
