const webpackAssetsSizeLimitPlugin = require('../lib');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpackAssetsSizeLimitPlugin({
            maxAssetSize: 1,
            include: ['js', 'css'],
        })
    ]
};