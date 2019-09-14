'use stick';

const path = require('path');
const glob = require('glob');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

const setMPA = () => {
    let entry = {};
    let htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, 'src/pages/*/main.js'));

    entryFiles.forEach(file => {
        let filename = '';
        let matchedStrs = file.match(/src\/pages\/(.*)\/.*js$/);
        if (Array.isArray(matchedStrs) && matchedStrs.length > 1) {
            filename = matchedStrs[1];
        } else {
            console.error('No matched entry files.');
        }

        entry[filename] = file;

        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src/template/index.html'),
                filename: `${filename}.html`,
                chunks: [filename],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    moveComments: true
                }
            })
        );
    });

    return  {
        entry,
        htmlWebpackPlugins
    };
};

let {
    entry,
    htmlWebpackPlugins
} = setMPA();

module.exports = {
    mode: 'production',
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 50,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 50,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: 'img/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'font/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/template/index.html'),
        //     filename: 'index.html',
        //     chunks: ['main'],
        //     inject: true,
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         moveComments: true
        //     }
        // }),
        new CleanWebpackPlugin(),
        
    ].concat(htmlWebpackPlugins).concat(new HTMLInlineCSSWebpackPlugin()),

};