/**
 * Payment API - client wrapper that calls server endpoints
 * Actual payment logic (Razorpay/Stripe) runs server-side to keep secrets secure.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Create payment order - calls server API
 */
export async function createPaymentOrder(amountInPaise, orderId, metadata = {}) {
  const res = await fetch(`${API_BASE}/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amountInPaise, orderId, metadata }),
  });
  return res.json();
}

/**
 * Verify payment - calls server API
 */
export async function verifyPayment(paymentId, signature, orderId) {
  const res = await fetch(`${API_BASE}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId, signature, orderId }),
  });
  const data = await res.json();
  return data.verified ?? false;
}
