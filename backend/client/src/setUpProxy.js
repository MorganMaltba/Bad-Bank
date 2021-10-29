const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/account',
    createProxyMiddleware({
      target: 'https://morgan-maltbafullstackbankapp.herokuapp.com/',
      changeOrigin: true,
    })
  );
};