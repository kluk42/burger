const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// It's used only on demand, so it's not added in the config
// Why not official package webpack-visualizer-plugin? See here https://github.com/chrisbateman/webpack-visualizer/issues/71
const Visualizer = require('webpack-visualizer-plugin2');
const path = require('path');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new CleanWebpackPlugin());
}

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: mode,
  plugins: [new MiniCssExtractPlugin()],

  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      // Browser can cache rarely updated packages, and only re-download them when there's an update of any of them
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-router)[\\/]/,
          name: 'vendor-react',
          chunks: 'all',
        },
      },
    },
  },

  plugins: plugins,

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  devtool: 'source-map',

  devServer: {
    static: './dist',
    hot: true,
    historyApiFallback: true,
  },
};
