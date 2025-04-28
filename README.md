# 🚀 Bulk Mail Server

A robust Node.js/Express backend service for handling bulk email operations with multiple SMTP provider support.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)

## 📋 Features

- 🔐 Token-based authentication system
- 📨 Multiple SMTP provider support
- ⚡ Asynchronous email processing
- 🛡️ Rate limiting and security measures
- 🔄 Auto-failover between SMTP providers
- 📝 Detailed logging and error handling

## 🛠️ Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Email Service**: Nodemailer
- **Security**: CORS, Environment Variables
- **Development**: Nodemon

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```

3. **Set up SMTP Credentials**
   ```env
   TOKEN_USER_1=your_token
   SMTP_USER_1=your_smtp_user
   SMTP_PASS_1=your_smtp_pass
   SMTP_HOST_1=your_smtp_host
   ```

4. **Start the Server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📡 API Endpoints

### Token Verification
```http
GET /api/verify
Header: x-auth-token: <your-token>
```

### Send Bulk Email
```http
POST /api/send-bulk-mail
Header: x-auth-token: <your-token>
Content-Type: application/json

{
  "recipients": ["email1@example.com", "email2@example.com"],
  "subject": "Your Subject",
  "body": "Email content in HTML"
}
```

## 🔒 Security Measures

- Token-based authentication
- Rate limiting per token
- CORS protection
- Environment variable configuration
- SMTP connection validation

## 📁 Project Structure

```
Backend/
├── config/
│   ├── token.js         # Token configuration
│   └── smtpConfig.js    # SMTP settings
├── middleware/
│   └── verifytoken.js   # Token verification
├── routes/
│   └── sendMail.js      # Mail routing
├── server.js            # Main server
└── .env                 # Environment variables
```

## ⚙️ Configuration

The server supports multiple SMTP providers with failover capability:

```javascript
{
  provider1: {
    host: "smtp-relay.provider1.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USER_1,
      pass: process.env.SMTP_PASS_1
    }
  },
  // Additional providers...
}
```

## 🔍 Error Handling

- SMTP connection failures
- Invalid token errors
- Rate limiting exceeded
- Malformed request data
- Email delivery failures

## 📝 Logging

Detailed logging for:
- Token verification attempts
- Email sending status
- SMTP connection status
- Error traces

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📜 License

This project is licensed under the MIT License.

---

<p align="center">Powered by Node.js and Express</p>
