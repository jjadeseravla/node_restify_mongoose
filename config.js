module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '2000',
  URL: process.env.BASE_URL || 'http://localhost:2000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://abc123!:abc123!@ds259253.mlab.com:59253/node_restify_mongoose',
  JWT_SECRET: process.env.JWT_SECRET || 'secret1'
};
