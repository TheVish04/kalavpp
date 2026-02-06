import { createContext, useState, useContext } from 'react';

export const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => [...prev, product]);
        console.log('Added to cart:', product.title);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}
