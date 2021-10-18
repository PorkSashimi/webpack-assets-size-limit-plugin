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
            maxAssetSize: 10,
            include: ['.js', '.css']
        })
    ]
};
```

Then run webpack:

```
yarn webpack
```

If the client bundle is larger than 10 kilobytes, then you'll get an error message like this:

```
 Error in WebpackAssetsSizeLimitPlugin
 - exceeded bundle count: 1
 - expected bundle size: 1 B
   1. main.js: 54 B
```