import "./cart-dropdown.styles.scss";
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item}></CartItem>
        ))}
      </div>
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
