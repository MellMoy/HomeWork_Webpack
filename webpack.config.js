const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    stats :{
        children : true,
        //     macModules : 0
            },
    mode : 'development',
    entry: './src/new.ts',
        
    output: {
    filename: 'main.js',
        
        
    },
    
// настройка dev-server
    devServer: {
        // contentBase: './dist',
        static : './dist',
        port : 3000,
        hot : true, // полезная для работы с реактом
        open : true,
        
        
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), 
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'development', 
            template: './src/index.pug',
            filename: 'index.html'
        }), 
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    },    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        }
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader : 'pug-loader',
                        options: { 
                            pretty: true,
                        },
                    },
                ], 
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    }
};