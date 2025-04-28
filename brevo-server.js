import nodemailer from 'nodemailer';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure Brevo SMTP transporter
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_AUTH_USER,    // Your Brevo account email
        pass: process.env.BREVO_AUTH_KEY     // Your SMTP API key
    },
    debug: true,
    logger: true
});

// Verify the connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP Connection Error:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

/**
 * Send mail to recipients
 * @param {string} email - The recipient email
 * @param {string} subject - The mail subject
 * @param {string} body - The mail body
*/

// Function to send bulk emails
export const sendBulkMail = async (req, res) => {
    try {
        const { recipients, subject, body } = req.body;
        console.log('Request body:', req.body);

        // Validate input
        if (!recipients || !subject || !body) {
            return res.status(400).json({ error: 'Invalid input format' });
        }

        // Send emails to all recipients
        const emailPromises = recipients.map(recipientEmail => {
            const mailOptions = {
                from: {
                    name: "The Support Team",         // Add a sender name
                    address: process.env.EMAIL_USER  // Your verified sender email
                },
                to: recipientEmail,
                subject: subject,
                html: body,
                text: body, // Fallback for clients that do not support HTML
                headers: {
                    'X-Priority': '1',
                    'X-MSMail-Priority': 'High'
                }
            };

            return transporter.sendMail(mailOptions);
        });

        const results = await Promise.all(emailPromises);
        const response = {
            success: true,
            message: `Emails sent to ${recipients.length} recipients`,
            details: results
        };
        console.log('Email sending results:', results);
        res.json(response);
    } catch (error) {
        console.error('Error sending bulk emails:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}