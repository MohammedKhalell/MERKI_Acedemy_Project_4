import { React, useContext } from "react";
import { appContext } from "../../App";

const Search = () => {
  const { allProducts, search } = useContext(appContext);
  return (
    <div>
      <div>
        <div className="search1"></div>
        <div className="content">
          {search &&
            allProducts
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.description.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((product, i) => {
                return (
                  <div className="item" key={i}>
                    <h2>{product.brand}</h2>
                    <h3>{product.productName}</h3>
                    <img
                      className="product-img"
                      src={product.image}
                      alt={product.productName}
                    ></img>
                    <div className="price-desc">
                      <p>{product.description}</p>
                      <p>{product.price}$</p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Search;
