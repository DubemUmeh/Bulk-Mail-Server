import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { recipients, subject, body } = req.body;
    const credentials = req.smtpCredentials;
    // console.log('SMTP Credentials:', credentials);


    if (!credentials || !credentials.user || !credentials.pass || !credentials.host || !credentials.from) {
      return res.status(401).json({ error: 'Invalid SMTP credentials' });
    }

    const transporter = nodemailer.createTransport({
      host: credentials.host,
      port: 587,
      secure: false,
      auth: {
        user: credentials.user,
        pass: credentials.pass
      }
    });

    // Verify connection configuration
    await transporter.verify();
    // console.log('SMTP connection verified for user:', credentials.user);

    if (!recipients || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailPromises = recipients.map(recipientEmail => {
      const mailOptions = {
        from: `${credentials.from}`,
        to: recipientEmail,
        subject,
        html: body,
      };

      return transporter.sendMail(mailOptions);
    });
    
    const results = await Promise.all(emailPromises);
    res.json({
      success: true,
      message: `Emails sent to ${recipients.length} recipients`,
      details: results
    });
    console.log(`Emails sent successfully to ${recipients.length} recipients`);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
});

export default router;
