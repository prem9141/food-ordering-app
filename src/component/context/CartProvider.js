import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedItems;

    if (existingItemIndex >= 0) {
      const existingItem = state.items[existingItemIndex];
      const newAmount = existingItem.amount + action.item.amount;
      const updatedItem = {
        ...existingItem,
        amount: newAmount,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedItems = [...state.items];

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingItemIndex];
    const updatedAmount = state.totalAmount - existingItem.price;

    const newAmount = existingItem.amount - 1;

    if (newAmount === 0) {
      const filteredItems = updatedItems.filter(
        (item) => item.id !== action.id
      );
      updatedItems = [...filteredItems];
    } else {
      const updatedItem = {
        ...existingItem,
        amount: newAmount,
      };

      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
