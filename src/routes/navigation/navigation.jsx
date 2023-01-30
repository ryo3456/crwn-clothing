import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import CartIcon from "../../components/cart-icon/cart-icon";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo">logo</CrwnLogo>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/sign-in">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
