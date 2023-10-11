import { formatCurrency } from "../utils/formatCurrency";

interface IStoreItem {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const StoreItem = ({ id, name, price, imgUrl }: IStoreItem) => {
  const quantity = 0;

  return (
    <div className="storeItem">
      <img src={imgUrl} alt={name} className="storeItem__coverImg" />
      <div className="storeItem__body">
        <div className="storeItem__body__title">
          <span>{name}</span>
          <span>{formatCurrency(price)}</span>
        </div>
        {quantity === 0 ? (
          <button className="storeItem__body__addBtn">+ Add To Cart</button>
        ) : (
          <div className="storeItem__body__quantity">
            <div className="storeItem__body__quantity__btns">
              <button>-</button>
              <span>0</span>
              <button>+</button>
            </div>
            <button className="storeItem__body__quantity__removeBtn">
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreItem;
