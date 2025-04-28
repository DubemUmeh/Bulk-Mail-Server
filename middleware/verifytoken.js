import { tokenMap } from "../config/token.js";

export function verifyTokens(req, res, next) {
  try {
    const token = req.headers['x-auth-token'];

    if (!token) {
      return res.status(401).json({ error: 'Token is required' });
    }

    const credentials = tokenMap[token];
    
    if (!credentials) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Verify SMTP credentials exist
    if (!credentials.user || !credentials.pass || !credentials.host) {
      console.error('Invalid SMTP configuration for token:', token);
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Attach SMTP credentials to request for use in routes
    req.smtpCredentials = credentials;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}