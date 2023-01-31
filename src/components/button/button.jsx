import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button-styles.jsx";

export const BTN_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BTN_TYPE_CLASSES.base) =>
  ({
    [BTN_TYPE_CLASSES.base]: BaseButton,
    [BTN_TYPE_CLASSES.google]: GoogleSignInButton,
    [BTN_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomBtn = getButton(buttonType);
  return <CustomBtn {...otherProps}>{children}</CustomBtn>;
};

export default Button;
