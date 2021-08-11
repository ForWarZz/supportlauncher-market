const path = require('path')
const webpack = require('webpack')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const { bundler, styles } = require('@ckeditor/ckeditor5-dev-utils')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: 'cheap-source-map',
  entry: path.resolve(__dirname, './src/ckeditor.ts'),

  output: {
    library: 'CustomEditor',
    path: path.resolve(__dirname, './build'),
    filename: 'ckeditor.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader'],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve(
                    path.join(process.cwd(), 'node_modules', '@ckeditor/ckeditor5-theme-lark')
                  ),
                },
                minify: true,
              }),
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'ckeditor.css',
    }),
    new CKEditorWebpackPlugin({
      // UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
      // When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.ts).
      language: 'fr',
      additionalLanguages: 'all',
    }),
    new webpack.BannerPlugin({
      banner: bundler.getLicenseBanner(),
      raw: true,
    }),
  ],
}
