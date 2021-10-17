const webpackAssetsSizeLimitPlugin = require('../lib');

module.exports = {
    mode: 'production',
    plugins: [
        new webpackAssetsSizeLimitPlugin({
            include: ['js'],
            maxAssetSize: 1,
        })
    ]
};