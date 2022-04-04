import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { COLORS } from "../constants";
import Loading from "../components/Loading";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";
import { CompaniesContext } from "../contexts/CompaniesContext";

const ProductDetails = () => {
  const {
    state: { user },
    actions: { updateUser },
  } = useContext(UserContext);
  const history = useHistory();

  const {
    state: {
      companies,
    },
  } = useContext(CompaniesContext);

  // fetch the product from the server by id
  const [product, setProduct] = useState({ _id: null });
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const id = useParams()._id;

  // we would usually put this in the helper file, since we are using it in multiple files
  const getCompanyName = (id, category) => {
    // console.log(id);
    // console.log(category);
    // console.log(companies);
    if (companies[category]) {
      const position = companies[category].findIndex((company) => company._id === id);
      return position !== -1 ? companies[category].find((company) => company._id === id).name : null;
    }
    return;
  };

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        const wishListPosition = user.wishList.findIndex(item => item._id === response.data._id);
        setIsWishlisted(wishListPosition !== -1);
      });
    // eslint-disable-next-line
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

  const handleWishList = () => {
    // console.log(user.email);
    if (!user.email) {
      history.push('/login');
      return;
    }

    setIsWishlisted(!isWishlisted);
    setForceUpdate(forceUpdate + 1);

    const productId = product._id;
    // update the wishList state

    const findProduct = user.wishList.findIndex(
      (item) => item._id === productId
    );
    console.log(findProduct);
    const copy = user.wishList;
    if (findProduct === -1) {
      copy.push(product);
    } else {
      copy.splice(findProduct, 1);
    }
    console.log(copy);
    updateUser({ user: { ...user, wishList: copy } });
    fetch(`/api/wishList2`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wishList: copy,
        email: user.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
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
          <CompanyName>{getCompanyName(product.companyId, product.category.toLowerCase())}</CompanyName>
          <Category>Category: {product.category}</Category>
          <BodyLocation>Body Location: {product.body_location}</BodyLocation>
          <Price>{product.price}</Price>
          {product.numInStock > 0 && (
            <AddToCart onClick={handleCart}>Add to Cart</AddToCart>
          )}
          <AddToWishList
            onClick={handleWishList}
            forceUpdate={forceUpdate}
          >
            <WishlistIcons
              // onMouseEnter={() => setHeartHover(true)}
              // onMouseLeave={() => setHeartHover(false)}
              isWishlisted={isWishlisted}
            >
              {isWishlisted ? (
                <AiFillHeart size="24" />
              ) : (
                <AiOutlineHeart size="24" />
              )}
            </WishlistIcons>
            <div>Add to Wishlist</div>
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
  border: none;
  background: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;
`;

const WishlistIcons = styled.div`
  color: ${({isWishlisted}) => isWishlisted ? COLORS.danger : COLORS.secondary};
`;
export default ProductDetails;
