import { useContext } from "react";
import { ProductContext } from "../../context/product.context";
import ProductCard from "../../components/product-card/product-card";
import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </div>
  );
};

export default Shop;
