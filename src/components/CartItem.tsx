import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCartContext } from "../context/ShoppingCartProvider";

interface ICartItem {
  id: number;
  quantity: number;
}

const CartItem = ({ id, quantity }: ICartItem) => {
  const { removeItem } = useShoppingCartContext();

  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;

  return (
    <div className="cartItem">
      <img src={item?.imgUrl} alt={item?.name} className="cartItem__coverImg" />
      <div className="cartItem__body">
        <div className="cartItem__body__description">
          <div>
            {item?.name}
            {quantity > 1 && <span>x{quantity}</span>}
          </div>
          <div>{formatCurrency(item?.price)}</div>
        </div>
        <div className="cartItem__body__close">
          <span>{formatCurrency(item.price * quantity)}</span>
          <button onClick={() => removeItem(id)}>&times;</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
