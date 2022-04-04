import { useContext, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { ItemsContext } from "../contexts/ItemsContext";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Loading from "./Loading";
import ProductCard from "./ProductCard";

const SearchBar = () => {
  const [addWidth, setAddWidth] = useState(false);
  const [search, setSearch] = useState("");
  const {
    state: { searchItems },
    actions: { receivedSearchItemsFromServer },
  } = useContext(ItemsContext);

  if (!searchItems) {
    return <Loading />;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetch(`/api/items?search=${search}`)
      .then((res) => res.json())
      .then((response) =>
        // TO DO
        // This items are not only for the search !!!
        // search result should be stored in a search array in the state.
        receivedSearchItemsFromServer({ searchItems: response.data })
      );
  };

  const getCompanyName = () => {
    return "company";
  };

  return (
    <SearchBarWrapper>
      <SearchIcon onClick={() => setAddWidth(!addWidth)} size="25" />
      {addWidth && (
        <SearchPopUp props={search}>
          <CloseIcon
            color={`${COLORS.dark}`}
            onClick={() => [setAddWidth(!addWidth), setSearch("")]}
          />
          <SearchContainer>
            <SearchHeader>What are you looking for ?</SearchHeader>
            <SearchBarInput onChange={handleSearch} placeholder="Search" />
            <Liner />
          </SearchContainer>

          {search && search.length > 3 && (
            <SearchTitle>
              You searched for ' <SearchParam>{search}</SearchParam> ' :
            </SearchTitle>
          )}

          <SearchItems>
            {searchItems.map((product) => {
              return (
                <Wrapper>
                  {!product.name.includes(search) && search.length > 3 && (
                    <>
                      <ProductCard
                        product={product}
                        getCompanyName={getCompanyName}
                      />
                    </>
                  )}
                </Wrapper>
              );
            })}
          </SearchItems>
        </SearchPopUp>
      )}
    </SearchBarWrapper>
  );
};

const SearchBarInput = styled.input`
  border: 1px solid white;
  width: 100%;
  height: 38px;
  outline: none;
  font-size: 16px;
  border-radius: 50px;
  background-color: transparent;
  opacity: 0.75;
  padding: 10px 0;
  color: ${COLORS.dark};
`;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`;

const SearchPopUp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${(props) => (props.props.length > 0 ? "auto" : "30%")};
  background: white;
  width: 100%;
  z-index: 99;
  transition: top ease 5s;
  box-shadow: 0px 68px 207px 200px rgba(0, 0, 0, 0.65);
`;

const SearchIcon = styled(AiOutlineSearch)`
  font-size: 20px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  padding: 50px;
  background: white ;
`;
const SearchHeader = styled.h1`
  color: ${COLORS.dark};
  font-weight: 400;
  padding: 10px 0;
`;
const CloseIcon = styled(AiOutlineClose)`
  font-size: 18px;
  position: absolute;
  right: 3%;
  top: 25px;
  cursor: pointer;
`;
const Liner = styled.hr`
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;
const SearchItems = styled.div`
  gap: 24px;
  display: flex ;
  flex-wrap: wrap;
  max-width: 75%;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  max-width: 90%;
`;
const SearchTitle = styled.h1`
  color: ${COLORS.dark};
  font-weight: 400;
  padding: 0 0 45px 170px;
  font-size: 20px;
`;

const SearchParam = styled.span`
  color: ${COLORS.danger};
`;

export default SearchBar;
