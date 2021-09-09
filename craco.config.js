const CracoLessConfig = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessConfig,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@font-size-base": "18px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
