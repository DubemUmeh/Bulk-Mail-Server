import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { verifyTokens } from './middleware/verifytoken.js';
import sendMail from './routes/sendMail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
'https://bulk-mail-sender-adms.onrender.com',
'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());

app.get('/api/verify', verifyTokens, (req, res) => {
    res.json({ success: true, message: 'Token verified successfully' });
});

// Correctly avoid applying verifyTokens again to /api/verify
app.use('/api', (req, res, next) => {
    if (req.path === '/verify') {
        return next();
    }
    verifyTokens(req, res, next);
});

app.use('/api', (req, res, next) => {
    if (req.path === '/send-bulk-mail') {
        return next();
    }
    sendMail(req, res, next);
});

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