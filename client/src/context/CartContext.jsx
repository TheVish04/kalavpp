
import { createContext } from 'react';

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
    return (
        <CartContext.Provider value={{}}>
            {children}
        </CartContext.Provider>
    );
}
