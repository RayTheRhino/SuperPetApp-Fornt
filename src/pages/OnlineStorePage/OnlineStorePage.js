import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { PRODUCTS } from "./products";
import { Product } from "./onlineShopPages/Product";
import "./onlineShopPage.css";

const OnlineStorePage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/onlineShop/cart">
              <ShoppingCart size="60" id="tinyc" />
              <ShoppingCart size="60" id="tinyc" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="onlineShop">
        <div className="onlineShopTitle">
          <h1 id="title">Pet-App Online Shop</h1>
        </div>
        <div className="products">
          {/* becuase this is a fullstack app we need to fetch this data from database using req over here! */}
          {PRODUCTS.map((product) => (
            <Product data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineStorePage;
