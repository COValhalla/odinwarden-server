const prod = {
  url: {
    API_URL: [
      'https://odinwarden.netlify.app',
      'http://odinwarden.netlify.app',
    ],
  },
};
const dev = {
  url: {
    API_URL: ['http://localhost:5173', 'http://localhost:5174', ''],
  },
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = config;
