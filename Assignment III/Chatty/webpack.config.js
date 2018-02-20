const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, use: 'eslint-loader' },
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
            { test: /\.less$/, use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'less-loader' }
            ]},
            { test: /\.svg$/,
                use: [
                    { loader: "babel-loader"},
                    {
                        loader: "react-svg-loader",
                        options: { jsx: true }
                    }
                ]
            }
        ]
    },
    watch: true,
    resolve: {
        extensions: ['.js', '.jsx', '.less']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
<<<<<<< HEAD
        port: 9021,
=======
        port: 9000,
>>>>>>> 078a1a4f57b82ad18182f22f2d94b2aac6302f01
        open: true
    },
    devtool: 'inline-source-map',
    plugins: [new HtmlWebpackPlugin({
        title: 'ChatRoomJS',
        template: './index.html'
    })]
};
