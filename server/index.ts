import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to KalaVPP API' });
});

import productRoutes from './routes/product.routes';
app.use('/api', productRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from KalaVPP Backend!' });
});

// Start server if not running in Vercel (or when run directly)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
