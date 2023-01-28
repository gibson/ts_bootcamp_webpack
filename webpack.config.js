const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const styleLoader = process.env.NODE_ENV === "production"
    ? MiniCssExtractPlugin.loader
    : "style-loader";

const config = {
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/dist',
        filename: '[contenthash].bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [styleLoader, 'css-loader'],
            }
        ]
    },
    devServer: {
        host: "localhost",
        open: true,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[contenthash].style.css",
        })
    ],
    devtool: "eval-source-map",
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};

module.exports = () => {
    return config;
}