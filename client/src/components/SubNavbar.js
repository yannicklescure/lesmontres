import { useEffect, useState } from "react";
import styled from "styled-components";

const SubNavbar = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/items?categories=true')
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      {
        categories.map(category => (
          <div key={category}>{category}</div>
        ))
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  gap: 100px;
`;

export default SubNavbar;