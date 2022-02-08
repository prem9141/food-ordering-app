import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../context/cart-context";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const [buttonBump, setButtonBump] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce(
    (previousValue, currentValue) => {
      return previousValue + currentValue.amount;
    },
    0
  );

  useEffect(() => {
    if (numberOfCartItems === 0) return;

    setButtonBump(true);

    const timer = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [numberOfCartItems]);

  const btnClasses = `${classes.button} ${buttonBump ? classes.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCartButton;
