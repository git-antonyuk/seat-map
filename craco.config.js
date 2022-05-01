// eslint-disable-next-line import/no-extraneous-dependencies
const CracoLessPlugin = require('craco-less');

module.exports = {
  eslint: {
    enable: false,
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#0046FF' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
