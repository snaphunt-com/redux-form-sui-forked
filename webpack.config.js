const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    library: 'ReduxFormSemanticUI',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    redux: {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
    },
    'redux-form': {
      root: 'ReduxForm',
      commonjs2: 'redux-form',
      commonjs: 'redux-form',
      amd: 'redux-form',
    },
    'semantic-ui-react': {
      root: 'SemanticUIReact',
      commonjs2: 'semantic-ui-react',
      commonjs: 'semantic-ui-react',
      amd: 'semantic-ui-react',
    },
    'react-datepicker': {
      root: 'ReactDatepicker',
      commonjs2: 'react-datepicker',
      commonjs: 'react-datepicker',
      amd: 'react-datepicker',
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
