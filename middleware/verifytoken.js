import axios from 'axios';

export function verifyTokens() {
  return async function (req, res, next) {
    try {
      const token = req.headers['x-auth-token'];
      if (!token) {
        return res.status(401).json({ error: 'Token is required' });
      }

      // Fetch credentials from Backend 2 (Database API)
      const dbApiUrl = 'https://bulk-mail-db-server.onrender.com/config/get-config';
      // const dbApiUrl = 'http://localhost:4000/config/get-config';
      const response = await axios.get(dbApiUrl, { params: { smtpToken: token } })
      // console.log('Response from Database API:', response.data);

      if (!response.data || !response.data.success || !response.data.data) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const config = response.data.data;
      // console.log('Config:', config);

      req.smtpCredentials = {
        user: config.smtp_user,
        pass: config.smtp_pass,
        host: config.smtp_host,
        from: config.smtp_from,
      };
      // console.log('SMTP Credentials:', req.smtpCredentials)
      next();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      console.error('Token verification error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}