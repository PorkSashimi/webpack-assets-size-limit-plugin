const webpackAssetsSizeLimitPlugin = require('../lib');

module.exports = {
    mode: 'production',
    plugins: [
        new webpackAssetsSizeLimitPlugin({
            limit: 53
        })
    ]
};