import MainBanner from "../components/MainBanner";
import PopularItemsBanner from "../components/PopularItemsBanner";
import CompaniesBanner from "../components/CompaniesBanner";

const Homepage = () => {
  return (
    <>
      <MainBanner />
      <PopularItemsBanner />
      <CompaniesBanner />
    </>
  );
};

export default Homepage;
