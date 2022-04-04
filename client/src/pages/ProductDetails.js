import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { COLORS } from "../constants";
import Loading from "../components/Loading";
import {
  AiOutlineHeart,
  AiFillHeart,
  // AiOutlineShopping,
  // AiFillShopping,
} from "react-icons/ai";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";

const ProductDetails = () => {
  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);
  const history = useHistory();

  // fetch the product from the server by id
  const [product, setProduct] = useState({ _id: null });
  const id = useParams()._id;

  // we would usually put this in the helper file, since we are using it in multiple files
  const getCompanyName = (id) => {
    // return companies.find((company) => company._id === id).name;
    return "company";
  };

  const [heartHover, setHeartHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  // const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      });
  }, [id]);

  if (!product._id) {
    return <Loading />;
  }

  const handleCart = () => {
    // console.log(user.email);
    if (!user.email) {
      history.push("/login");
      return;
    }
    const productId = product._id;
    // update the cartArray state

    const findProduct = user.cartArray.findIndex(
      (item) => item._id === productId
    );
    console.log(findProduct);
    const copy = user.cartArray;
    if (findProduct === -1) {
      copy.push(product);
    } else {
      copy.splice(findProduct, 1);
    }
    console.log(copy);
    // updateUser({ user: { ...user, cartArray: copy } });
    updateUser({ user: { ...user, cartArray: copy } });
    fetch(`/api/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartArray: copy,
        email: user.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        console.log({ _id: productId });
        // sessionStorage.setItem("currentUser", JSON.stringify(data));
        // history.push(`/profile/${data.id}`); // redirect to currentUser's profile
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <ProductImg>
          <StyledImg src={product.imageSrc} alt="{product.imageSrc}" />
        </ProductImg>
        <Description>
          {product.numInStock === 0 ? (
            <OutOfStock>Out of Stock</OutOfStock>
          ) : (
            <InStock>In Stock</InStock>
          )}
          <ItemName>{product.name}</ItemName>
          <CompanyName>{getCompanyName(product.companyId)}</CompanyName>
          <Category>Category: {product.category}</Category>
          <BodyLocation>Body Location: {product.body_location}</BodyLocation>
          <Price>{product.price}</Price>
          {product.numInStock > 0 && (
            <AddToCart onClick={handleCart}>Add to Cart</AddToCart>
          )}
          <AddToWishList>
            <WishlistIcons
              onMouseEnter={() => setHeartHover(true)}
              onMouseLeave={() => setHeartHover(false)}
            >
              {heartHover ? (
                <AiFillHeart size="22" color="grey" />
              ) : (
                <AiOutlineHeart size="22" color="grey" />
              )}
            </WishlistIcons>
            Add to Wishlist
          </AddToWishList>
        </Description>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  margin-top: 50px;
  /* border: 0.5px solid #e6e6e6; */
  border-radius: 5px;
  padding: 30px;
  gap: 5px;
`;

const ProductImg = styled.div`
  padding-right: 30px;
`;
const StyledImg = styled.img`
  margin: auto;
  object-fit: contain;
  height: 300px;
  width: 300px;
`;

const Description = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  gap: 10px;
`;

const OutOfStock = styled.div`
  background-color: ${COLORS.danger};
  font-size: 12px;
  font-family: Lato, sans-serif;
  text-decoration: none;
  color: white;
  padding: 5px;
  width: fit-content;
`;
const InStock = styled.div`
  background-color: ${COLORS.mediumAquamarine};
  font-size: 12px;
  font-family: Lato, sans-serif;
  text-decoration: none;
  color: white;
  padding: 5px;
  width: fit-content;
`;

const ItemName = styled.div`
  /* padding: 0 15px 12px 30px; */
  color: ${COLORS.secondary};
  text-decoration: none;
  /* text-transform: uppercase; */
  font-size: 18px;
  font-family: Lato, sans-serif;
  font-weight: bold;
  /* letter-spacing: 1px; */
`;
const CompanyName = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-family: Lato, sans-serif;
  text-decoration: none;
  color: black;
`;

const Category = styled.div``;
const BodyLocation = styled.div``;

const Price = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: black;
  /* padding-bottom: 15px; */
  padding: 15px 0 15px 0;
`;

const AddToCart = styled.button`
  border: 1px solid ${COLORS.grey};
  padding: 10px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.light};
  /* padding: 20px 24px; */
  transition: all 400ms ease;

  &:hover {
    background-color: ${COLORS.darker};
  }
`;

const AddToWishList = styled.button`
  text-align: left;
  /* background-color: transparent; */
  border: none;
  background-color: transparent;
  /* border: 1px solid ${COLORS.grey}; */
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  /* text-transform: uppercase; */
  font-size: 12px;
`;

const WishlistIcons = styled.div`
  cursor: pointer;
`;
export default ProductDetails;
