import storeItems from "../data/items.json";
import StoreItem from "../components/StoreItem";

const Store = () => {
  return (
    <main className="store">
      <h1 className="store__title">Store</h1>
      <div className="store__items">
        {storeItems.map((item) => {
          return <StoreItem {...item} key={item.id} />;
        })}
      </div>
    </main>
  );
};

export default Store;
