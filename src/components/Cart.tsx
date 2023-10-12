import { useShoppingCartContext } from "../context/ShoppingCartProvider";
import { formatCurrency } from "../utils/formatCurrency";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";

interface ICart {
  isOpen: boolean;
}

const Cart = ({ isOpen }: ICart) => {
  const { openCart, quantity } = useShoppingCartContext();

  return (
    <>
      {isOpen && (
        <>
          <div className="backdrop"></div>
          <aside className="cart">
            <div className="cart__titleWrapper">
              <h2 className="cart__titleWrapper__title">Cart</h2>
              <button
                onClick={openCart}
                className="cart__titleWrapper__closeBtn"
              >
                &times;
              </button>
            </div>
            {quantity.map((element) => {
              return <CartItem {...element} key={element.id} />;
            })}
            <span className="cart__total">
              Total{" "}
              {formatCurrency(
                quantity.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </span>
          </aside>
        </>
      )}
    </>
  );
};

export default Cart;
