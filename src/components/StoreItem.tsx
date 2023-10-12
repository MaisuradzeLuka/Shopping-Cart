import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCartContext } from "../context/ShoppingCartProvider";

interface IStoreItem {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const StoreItem = ({ id, name, price, imgUrl }: IStoreItem) => {
  const { getQuantity, increaseQuantity, decreaseQuantity, removeItem } =
    useShoppingCartContext();

  const quantity = getQuantity(id);

  return (
    <div className="storeItem">
      <img src={imgUrl} alt={name} className="storeItem__coverImg" />
      <div className="storeItem__body">
        <div className="storeItem__body__title">
          <span>{name}</span>
          <span>{formatCurrency(price)}</span>
        </div>
        {quantity === 0 ? (
          <button
            className="storeItem__body__addBtn"
            onClick={() => increaseQuantity(id)}
          >
            + Add To Cart
          </button>
        ) : (
          <div className="storeItem__body__quantity">
            <div className="storeItem__body__quantity__btns">
              <button onClick={() => decreaseQuantity(id)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => increaseQuantity(id)}>+</button>
            </div>
            <button
              className="storeItem__body__quantity__removeBtn"
              onClick={() => removeItem(id)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreItem;
