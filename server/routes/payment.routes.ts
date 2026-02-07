import { Router, Request, Response } from 'express';
import { createPaymentOrder, verifyPayment } from '../services/payment.service';

const router = Router();

router.post('/payment/create-order', async (req: Request, res: Response) => {
  try {
    const { amountInPaise, orderId, metadata } = req.body;
    const result = await createPaymentOrder(amountInPaise, orderId, metadata);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

router.post('/payment/verify', async (req: Request, res: Response) => {
  try {
    const { paymentId, signature, orderId } = req.body;
    const verified = await verifyPayment(paymentId, signature, orderId);
    res.json({ verified });
  } catch (err) {
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

export default router;
