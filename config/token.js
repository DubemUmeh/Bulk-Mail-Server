import dotenv from 'dotenv';
dotenv.config();

// Create token map
export const tokenMap = {
  [process.env.TOKEN_USER_1]: {
    host: process.env.SMTP_HOST_1,
    user: process.env.SMTP_USER_1,
    pass: process.env.SMTP_PASS_1,
    from: process.env.SMTP_FROM_1,
  },
  [process.env.TOKEN_USER_2]: {
    host: process.env.SMTP_HOST_2,
    user: process.env.SMTP_USER_2,
    pass: process.env.SMTP_PASS_2,
    from: process.env.SMTP_FROM_2,
  },
  [process.env.TOKEN_USER_3]: {
    host: process.env.SMTP_HOST_3,
    user: process.env.SMTP_USER_3,
    pass: process.env.SMTP_PASS_3,
    from: process.env.SMTP_FROM_3,
  },
  [process.env.TOKEN_USER_4]: {
    host: process.env.SMTP_HOST_4,
    user: process.env.SMTP_USER_4,
    pass: process.env.SMTP_PASS_4,
    from: process.env.SMTP_FROM_4,
  },
  [process.env.TOKEN_USER_5]: {
    host: process.env.SMTP_HOST_5,
    user: process.env.SMTP_USER_5,
    pass: process.env.SMTP_PASS_5,
    from: process.env.SMTP_FROM_5,
  },
};

// Debug log available tokens
console.log('Available tokens:', Object.keys(tokenMap));
console.log('Token configurations loaded:', Object.entries(tokenMap).map(([token, config]) => ({
  token: token.substr(0, 8) + '...',
  hasUser: !!config.user,
  hasPass: !!config.pass,
  hasHost: config.host
})));
