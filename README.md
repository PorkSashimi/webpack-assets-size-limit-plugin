# webpack-assets-size-limit-plugin

## Quick Start

Install the plugin:

```
yarn -D webpack-assets-size-limit-plugin
```

Add it as as a plugin:

```
const webpackAssetsSizeLimitPlugin = require('webpack-assets-size-limit-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new webpackAssetsSizeLimitPlugin({
            limit: 53,
            include: (assetName) => {
                return assetName.endsWith('js')
            }
        })
    ]
};
```