var path = require('path');

module.exports = {
  entry: ['./js/main.js'],
  output: {
    path: path.join('./js'), // Output directory
    filename: 'bundle.js'
  }
}
