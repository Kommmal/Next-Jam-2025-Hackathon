"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SingleProduct {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  slug: string;
  colors: string[];
  sizes: string[];
  quantity: number; // Added quantity field
}

interface CartContextType {
  cart: SingleProduct[];
  addToCart: (product: SingleProduct, quantity: number) => void; // Modify to accept quantity
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  calculateSubtotal: () => number;
  discount: number;
  deliveryFee: number;
  total: number;
  search: string;
  setSearch: (value: string) => void;
  increaseQuantity: (id: string) => void; // Function to increase quantity
  decreaseQuantity: (id: string) => void; // Function to decrease quantity
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<SingleProduct[]>([]);
  const [search, setSearch] = useState("");

  // Load the cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Add product to the cart or update its quantity if already exists
  const addToCart = (product: SingleProduct, quantity: number) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      // If the product already exists, update its quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // If the product doesn't exist, add it with the specified quantity
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  // Remove product from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((product) => product._id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]); // Reset cart state to an empty array
    localStorage.removeItem("cart"); // Optionally, clear cart data from localStorage as well
  };

  // Increase the quantity of a specific product
  const increaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease the quantity of a specific product
  const decreaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate the subtotal of the cart
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Discount and delivery fee
  const discount = calculateSubtotal() * 0.2;
  const deliveryFee = 15;
  const total = calculateSubtotal() - discount + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        calculateSubtotal,
        discount,
        deliveryFee,
        total,
        search,
        setSearch,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
