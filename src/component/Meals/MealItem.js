import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../context/cart-context";
import { useContext } from "react";

function MealItem(props) {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addItemToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addItemToCart={addItemToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
