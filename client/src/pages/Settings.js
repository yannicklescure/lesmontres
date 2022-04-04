import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

const Settings = () => {

  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <Wrapper>
      <Container>
        <div>{user.firstName} {user.lastName}</div>
        <div>{user.email}</div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 775px;
  min-height: calc(100vh - 85px - 47px);
  max-width: 1320px;
  margin: 0 auto;
  padding: 16px 0;
  font-size: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Settings;