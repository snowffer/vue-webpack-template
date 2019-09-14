'use stick';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                    collapseWhitespace: false,
                    preserveLineBreaks: false,
                    minifyCSS: false,
                    minifyJS: false,
                    moveComments: false
                }
            })
        );
    });

    return {
        entry,
        htmlWebpackPlugins
    };
};

let {
    entry,
    htmlWebpackPlugins
} = setMPA();

module.exports = {
    mode: 'none',
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300,
    //     poll: 1000
    // },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
    ].concat(htmlWebpackPlugins),
    devServer: {
        contentBase: './',
        hot: true
    },
    devtool: 'cheap-eval-source-map'
};