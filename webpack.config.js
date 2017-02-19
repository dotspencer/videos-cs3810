var path = require('path');

module.exports = {
  entry: [__dirname + '/js/main'],
  output: {
    path: path.join(__dirname + '/js'), // Output directory
    filename: 'bundle.js',

    // The webpack-dev-server doesn't write to disk (bundle.js
    // is not actually modified), it just serves the file
    // from memory. If publicPath is not specified, it will by
    // default output bundle.js to '/' instead of '/js'.
    publicPath: "/js/"
  }
}
