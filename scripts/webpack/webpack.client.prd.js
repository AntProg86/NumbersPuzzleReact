const path = require('path');
const config = require('config');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = () => ({
    entry: {
        client: [
          './src/client/index.ts',
        ],
      },
    target: 'web',
    devtool: false,
    output: {
      path: path.resolve(process.cwd(), 'build'),
      filename: '[name]-[fullhash:10].js',
    },
    mode: 'production',

    module: {
        rules: [
            // Loading ts
            {
                test: /\.tsx?$/,
                exclude: ['/node_modules/'], // exclude node_modules because not need transform node.js lib
                use: [
                  {
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true,
                      configFile: path.resolve(process.cwd(), 'tsconfig.json'),
                    },
                  },
                ],
            },
            // Loading js
            {
                test: /\.js$/,
                exclude: /node_modules/, // exclude node_modules because not need transform node.js lib
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            // Loading images
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name]-[sha1:hash:7].[ext]'
                        }
                    }
                ]
            },
            // Loading pdf
            {
                test: /\.(pdf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'documents',
                            name: '[name]-[sha1:hash:7].[ext]'
                        }
                    }
                ]
            },
            // Loading fonts
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
            // Loading SASS/SCSS
            {
                test: /\.(s[ca]ss)$/,
                use: [
                    // FOR DEV
                    // { loader: 'style-loader' }, // creates style nodes from JS strings

                    // FOR PRD
                    { loader: MiniCssExtractPlugin.loader }, // creates style nodes from JS strings

                    { loader: 'css-loader' }, // translates CSS into CommonJS
                    { loader: 'sass-loader' } // compiles Sass to CSS
                ]
            },
            // Loading css
            {
                test: /\.(css)$/,
                use: [
                    // FOR DEV
                    //{ loader: 'style-loader' }, // creates style nodes from JS strings

                    // FOR PRD
                    { loader: MiniCssExtractPlugin.loader }, // creates style nodes from JS strings


                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // FOR DEV
                    //{ loader: 'style-loader' }, // creates style nodes from JS strings

                    // FOR PRD
                    { loader: MiniCssExtractPlugin.loader }, // creates style nodes from JS strings

                    { loader: 'css-loader' }, // translates CSS into CommonJS
                    { loader: 'less-loader' } // compiles Sass to CSS
                ],
              },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new HtmlMinimizerPlugin(),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            buildTime: new Date().toISOString(),
            template: './src/client/index.html',
            favicon: './src/assets/ico/favicon.ico',
        }),
        new HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[fullhash:10].css'
        }),
        // Копируем статические файлы
        new CopyPlugin({
            patterns: [
                { from: "./src/assets/pictures/loader.gif", to: "./images/screensavers" },
            ],
        }),
    ],
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({ configFile: path.resolve(process.cwd(), 'tsconfig.json') }),
        ],
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
        extensions: [
          '.web.js',
          '.mjs',
          '.js',
          '.json',
          '.web.jsx',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
});