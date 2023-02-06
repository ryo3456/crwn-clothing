import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
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

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomBtn = getButton(buttonType);
  return (
    <CustomBtn disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomBtn>
  );
};

export default Button;
