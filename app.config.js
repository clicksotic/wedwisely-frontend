// Load .env at config time and inject into expo.extra so it's available via Constants
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      ...(config.extra || {}),
      DEVELOPMENT: process.env.DEVELOPMENT,
      STAGING: process.env.STAGING,
      PRODUCTION: process.env.PRODUCTION,
      TIMEOUT_MS: process.env.TIMEOUT_MS ? Number(process.env.TIMEOUT_MS) : undefined,
      ENVIRONMENT: process.env.ENVIRONMENT || 'development',
    },
  };
};


