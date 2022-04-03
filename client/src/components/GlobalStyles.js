import { createGlobalStyle } from "styled-components";
import { COLORS } from "../constants";

export default createGlobalStyle`
  :root {
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  * {
        font-family: Helvetica, sans-serif;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
      /* background-color: ${COLORS.darker}; */
      /* background: url("/images/trackers.png") no-repeat center center fixed; */
      /* background-size: cover; */
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  input {
    font-size: 16px;
    height: 32px;
    /* border: 2px solid var(--color-orange); */
    border-radius: 4px;
    padding: 0 12px;
  }
  /* CART */
.cart {
  height: 100%;
  width: 25%;

  position: relative;
}
/* cart header */
.cart-header {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
/* cart items */
.cart-items {
  max-height: calc(100vh - 247px);
  overflow-y: auto;
  overflow-x: hidden;
}
/* cart item */
.cart-item {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
.cart-item div {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* item info */
.cart-item .item-info {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.6);

  border-radius: 0 10px 10px 0;

  padding: 10px;
}
.cart-item .item-info:hover {
  background-color: rgba(255, 0, 0, 0.6);
  cursor: pointer;
}
.cart-item .item-info img {
  width: 75px;
}
/* unit price */
.cart-item .unit-price {
  flex: 1;
  font-size: 1.2rem;
}
/* units */
.cart-item .units {
  flex: 1;
}
.cart-item .units .number {
  margin: 0 10px;

  font-size: 1.2rem;
}
.cart-item .units .btn {
  width: 20px;
  height: 20px;

  background-color: rgb(242, 255, 58);

  border-radius: 50%;

  font-weight: bold;

  cursor: pointer;

  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
}

/* cart footer */
.cart-footer {
  width: 100%;
  background-color: rgb(255, 21, 21);
  position: absolute;
  bottom: 0;
  left: 0;

  border-left: 1px solid rgb(var(--right-side-bg-color));
}
.cart-footer div {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px 0;

  font-size: 1.3rem;
}
.cart-footer .subtotal {
  background-color: white;
}
.cart-footer .checkout {
  background-color: rgb(242, 255, 58);

  cursor: pointer;
}
`;

// font-family: 'Roboto', sans-serif;
// font-family: 'Yeseva One', cursive;
