// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/assets/scss/global.scss')],
    },
  },
  /*configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: false,
                // sass-loader version >= 8
                sassOptions: {
                  indentedSyntax: false,
                },
              },
            },
          ],
        },
      ],
    },
  },*/

  /*pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [],
    },
  },*/
};
