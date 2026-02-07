/** Business rules for orders and checkout */

export const TAX_RATE = 0.08;

/** Subtotal above this gets free shipping */
export const FREE_SHIPPING_THRESHOLD = 500;

/** Flat shipping cost when below free shipping threshold */
export const SHIPPING_COST = 20;

export function calculateOrderTotals(subtotal) {
    const tax = subtotal * TAX_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
}
