module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'https://query1.finance.yahoo.com/'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/stock-market-stats/'
    : '/'
};
