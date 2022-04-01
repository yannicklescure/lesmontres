import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { ItemsContext } from "../contexts/ItemsContext";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Loading from "./Loading";
export default function SearchBar() {
  const [addWidth, setAddWidth] = useState(false);
  const [search, setSearch] = useState("");
  const {
    state: { searchItems },
    actions: { receivedItemsFromServer },
  } = useContext(ItemsContext);

  useEffect(() => {
    fetch(`/api/items?search=${search}`)
      .then((res) => res.json())
      .then((response) =>
        receivedItemsFromServer({ searchItems: response.data })
      );
  }, [search]);

  if (!searchItems) {
    return <Loading />;
  }

  return (
    <SearchBarWrapper>
      <SearchIcon onClick={() => setAddWidth(!addWidth)} />
      {addWidth && (
        <SearchPopUp props={search}>
          <CloseIcon
            color={`${COLORS.dark}`}
            onClick={() => [setAddWidth(!addWidth), setSearch("")]}
          />
          <SearchContainer>
            <SearchHeader>What Are You Looking For ?</SearchHeader>
            <SearchBarInput
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
            <Liner />
          </SearchContainer>

          {search && search.length > 3 && (
            <SearchTitle>
              You Searched For ' <SearchParam>{search}</SearchParam> ' :
            </SearchTitle>
          )}

          <SearchItems>
            {searchItems.map((i) => {
              return (
                <>
                  {!i.name.includes(search) && search.length > 3 && (
                    <Item>
                      <ItemImg src={i.imageSrc} alt={i.name} />
                      <ItemName>{i.name}</ItemName>
                      <ItemPrice>{i.price}</ItemPrice>
                      <ItemBuy>Add To Cart</ItemBuy>
                    </Item>
                  )}
                </>
              );
            })}
          </SearchItems>
        </SearchPopUp>
      )}
    </SearchBarWrapper>
  );
}

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
const SearchBarWrapper = styled.div``;
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
  font-size: 18px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  padding: 50px;
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
  display: flex;
  justify-content: center;
  gap: 10px;

  display: grid;
  grid-template-columns: auto auto auto auto auto;
  max-width: 80%;
  margin: 0 auto;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 5px 15px 2px rgb(0 0 0 / 3%);
`;
const ItemImg = styled.img`
  height: 150px;
  width: 180px;
  margin: 15px auto;
`;

const ItemName = styled.p`
  color: ${COLORS.dark};
  padding: 0 10px;
`;
const ItemPrice = styled.p`
  color: ${COLORS.danger};
  padding: 10px;
`;
const ItemBuy = styled.button`
  background-color: ${COLORS.danger};
  color: ${COLORS.white};
  width: 90%;
  border-radius: 100px;
  outline: none;
  border: none;
  height: 40px;
  margin: 12px auto;
  padding: 9px;
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
