var path = require('path');

module.exports = {
  entry: './index.js',

  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
      ,
      {
        test: /\.css$/,
        exclude: /react-infinite-calendar/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
      {
        test: /\.css$/,
        include: /react-infinite-calendar/,
        loader: 'style-loader!css-loader',
      },
    ]
  }
}
