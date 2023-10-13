import { ReactNode, createContext, useContext, useState } from "react";
import Cart from "../components/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface ICartItem {
  id: number;
  quantity: number;
}

interface IShoppingCartContext {
  getQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  openCart: () => void;
  cartQuantity: number;
  quantity: ICartItem[];
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}

const ShoppingCartProvider = ({ children }: IShoppingCartProviderProps) => {
  const [quantity, setQuantity] = useLocalStorage<ICartItem[]>(
    "shipping cart",
    []
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = quantity.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  const getQuantity = (id: number) => {
    return quantity.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseQuantity = (id: number) => {
    setQuantity((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseQuantity = (id: number) => {
    setQuantity((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItem = (id: number) => {
    setQuantity((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        quantity,
        cartQuantity,
        openCart,
      }}
    >
      {children}
      <Cart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
