import { useState, useEffect } from "react";
import Homepage from "../pages/Homepage";
import GlobalStyles from "./GlobalStyles";
import Navbar from "../components/Navbar";
import SubNavbar from "../components/SubNavbar";

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <SubNavbar />
      <Homepage />
    </>
  );
}

export default App;
