const publicPath = require('path').join(__dirname, 'client' ,'public');

module.exports = {
    entry: './client/src/index.js',
    output: {
        path: publicPath,
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    node: {
        fs:'empty'
    }
}