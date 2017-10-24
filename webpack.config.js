const path = require('path')

module.exports = {
  context: __dirname, // the project dir
  // This is the "main" file which should include all other modules
  entry: './src/main.js',
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: path.join(__dirname, './dist'),
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  devtool: 'source-map',

  module: {
    // Special compilation rules
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  }
}
