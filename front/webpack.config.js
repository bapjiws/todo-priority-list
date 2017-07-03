const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const inProductionMode = NODE_ENV === 'production';

const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '/src/index.html')
    }),
    new ExtractTextPlugin('main.css')
];

if (inProductionMode) {
    // TODO: use webpack.EnvironmentPlugin and remove webpack.DefinePlugin
    const dotEnvVars = require('dotenv').config().parsed;
    const envVars = Object.keys(dotEnvVars).
    reduce( (acc, key) => {
        acc['process.env'][key] = JSON.stringify(dotEnvVars[key]);
        return acc;
    }, {
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    });

    plugins.push(
        // new webpack.EnvironmentPlugin(['NODE_ENV', 'GOOGLE_URL_SHORTENER_API', 'API_KEY', 'APP_URL']),
        new webpack.DefinePlugin(envVars),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    )
} else {
    const dotEnvVars = require('dotenv').config().parsed;
    const envVars = Object.keys(dotEnvVars).
    reduce( (acc, key) => {
        acc['process.env'][key] = JSON.stringify(dotEnvVars[key]);
        return acc;
    }, {
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    });

    plugins.push(
        new webpack.DefinePlugin(envVars),
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = {
    entry: inProductionMode ? {
        bundle: './src/index.js',
        vendor: ['react', 'react-dom', 'react-redux', 'redux', 'redux-thunk']
    } : [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index.js'
    ],

    output: {
        path: path.join(__dirname, 'build'),
        filename: inProductionMode ? '[name].[chunkhash].js' : 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, '/src'),
                    path.join(__dirname, '/redux'),
                    path.join(__dirname, '/utils')
                ],
                // React Hot Loader should be automatically disabled in production.
                use: ['react-hot-loader/webpack', 'babel-loader']
            },

            {
                test: /\.scss$/,
                use: inProductionMode ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }) : ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }))
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.jsx', '.js', '.scss'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },

    plugins,

    devtool: inProductionMode ? undefined : 'source-map'
};
