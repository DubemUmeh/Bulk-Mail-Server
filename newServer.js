import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { verifyTokens } from './middleware/verifytoken.js';
import sendMail from './routes/sendMail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://bulk-mail-ruddy.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    exposedHeaders: ['x-auth-token']
}));
app.use(express.json());

// Add verify endpoint
app.get('/api/verify', verifyTokens, (req, res) => {
    res.json({ success: true, message: 'Token verified successfully' });
});

// Apply token verification middleware before routes
app.use('/api', verifyTokens);
app.use('/api', sendMail);

app.get('/', (req, res) => {
    res.json({ message: 'Bulk Email Server is running 🚀' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});