import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  variantId: string;
  handle: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalItems: number; // Total number of cans
  totalPacks: number; // Total number of 4-packs
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available (client-side only)
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('drinksip-cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart) as CartItem[];
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e);
        }
      }
    }
    return [];
  });
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('drinksip-cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    const PACK_SIZE = 4; // Each item is a 4-pack
    
    setItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find(
        (item) => item.variantId === newItem.variantId
      );

      if (existingItem) {
        // Add 4 more cans (1 four-pack)
        return prevItems.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + PACK_SIZE }
            : item
        );
      } else {
        // Add new item with 4 cans (1 four-pack)
        return [
          ...prevItems,
          {
            ...newItem,
            id: `${newItem.variantId}-${Date.now()}`,
            quantity: PACK_SIZE
          }
        ];
      }
    });
    
    // Open drawer when item is added
    setIsDrawerOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPacks = Math.floor(totalItems / 4); // Each pack has 4 cans

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        addItem,
        updateQuantity,
        removeItem,
        openDrawer,
        closeDrawer,
        totalItems,
        totalPacks
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
