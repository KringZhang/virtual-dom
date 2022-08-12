const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'virtual',
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        port: 8080,
        open: true,
        contentBase: path.resolve(__dirname, 'static')
    }
}