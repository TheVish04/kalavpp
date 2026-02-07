/**
 * Payment gateway integration - Razorpay
 * Runs server-side to keep secret keys secure.
 */

import Razorpay from 'razorpay';
import crypto from 'crypto';

const keyId = process.env.RZP_KEY_ID;
const keySecret = process.env.RZP_KEY_SECRET;

let razorpay: Razorpay | null = null;
if (keyId && keySecret) {
  razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
}

/**
 * Create a Razorpay order
 * @param amountInPaise - Amount in paise (INR subunits)
 * @param receipt - Platform order ID for reconciliation
 * @param metadata - Optional notes
 */
export async function createPaymentOrder(
  amountInPaise: number,
  receipt: string,
  metadata: Record<string, unknown> = {}
): Promise<{ orderId: string; keyId: string }> {
  if (!razorpay || !keyId) {
    console.warn('Razorpay not configured. Set RZP_KEY_ID and RZP_KEY_SECRET. Using mock.');
    return {
      orderId: `order_mock_${Date.now()}`,
      keyId: keyId || 'rzp_test_xxx',
    };
  }

  const order = await razorpay.orders.create({
    amount: Math.round(amountInPaise),
    currency: 'INR',
    receipt: String(receipt).slice(0, 40),
    notes: metadata as Record<string, string>,
  });

  return {
    orderId: order.id,
    keyId: keyId,
  };
}

/**
 * Verify Razorpay payment signature
 */
export async function verifyPayment(
  paymentId: string,
  signature: string,
  razorpayOrderId: string
): Promise<boolean> {
  if (!keySecret) {
    console.warn('RZP_KEY_SECRET not set. Skipping verification.');
    return true;
  }

  const body = `${razorpayOrderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(body)
    .digest('hex');
  return expected === signature;
}
