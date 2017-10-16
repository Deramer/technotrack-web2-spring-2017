var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    context: `${__dirname}/assets/js`,

    entry: `${__dirname}/assets/js/index`,

    output: {
        path: `${__dirname}/static/bundles/`,
        filename: NODE_ENV ? '[name].js' : "[name]-[hash].js",

    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin,
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: `${__dirname}/assets/js/`,
                loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-1'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.{png|jpg|gif|svg|ttf}$/,
                loader: 'url-loader?limit=4096&name=[path]-[name].[ext]',
            },
        ],
    },

    resolve: {
        modules: ['node_modules', `${__dirname}/assets/js`],
        extensions: ['.js', '.jsx'],
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
    },

    devtool: NODE_ENV === 'development' ? 'eval-module-source-map' : false,
};

if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnigns: false,
                drop_console: true,
                unsafe: true,
            },
        })
    );
}
