import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";

function MealItemForm(props) {
  const amountRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredAmountNo = +enteredAmount;
    if (enteredAmountNo < 1 || enteredAmountNo > 5) {
      setIsAmountValid(false);
      return;
    }

    props.addItemToCart(enteredAmountNo);
    setIsAmountValid(true);
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        label="Amount"
        input={{
          type: "number",
          id: "amount_" + props.id,
          min: "1",
          max: "5",
          steps: "1",
          defaultValue: "1",
          ref: amountRef,
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount</p>}
    </form>
  );
}

export default MealItemForm;
