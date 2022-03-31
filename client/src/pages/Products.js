import { useEffect } from "react";

const Products = () => {

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then((reponse) => {
        console.log(reponse);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <>Products page</>
  )
}

export default Products;