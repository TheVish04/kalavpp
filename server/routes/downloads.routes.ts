import { Router, Request, Response } from 'express';
import { getSignedDownloadUrl, hasDownloadAccess } from '../services/downloads.service';

const router = Router();

router.get('/downloads/signed-url', async (req: Request, res: Response) => {
  try {
    const { assetId } = req.query;
    const userId = (req as Request & { user?: { id: string } }).user?.id || '';
    if (!assetId || typeof assetId !== 'string') {
      res.status(400).json({ error: 'Missing assetId' });
      return;
    }
    const hasAccess = await hasDownloadAccess(assetId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }
    const result = await getSignedDownloadUrl(assetId, userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
});

export default router;
