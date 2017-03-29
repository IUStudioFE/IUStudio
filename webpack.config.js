/**
 * @description webpack配置文件
 * @author wing
 */
const path = require('path');

module.exports = function() {
    return {
        entry: [
            path.join(__dirname, './src/index.umd.js')
        ],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'IUStudio.js',
            library: 'IUStudio',
            libraryTarget: 'umd'
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            }]
        },
        devtool: "inline-source-map",
        // watch: true
    }
}