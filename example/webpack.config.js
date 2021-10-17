const webpackAssetsSizeLimitPlugin = require('../lib');

module.exports = {
    mode: 'production',
    plugins: [
        new webpackAssetsSizeLimitPlugin({
            maxAssetSize: 1
        })
    ]
};