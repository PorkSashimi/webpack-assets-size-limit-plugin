"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var chalk_1 = require("chalk");
var PLUGIN_NAME = 'WebpackAssetsSizeLimitPlugin';
// ------ ------ ------ ------ ------ ------ ------ ------
var WebpackChunkSizeLimitPlugin = /** @class */ (function () {
    function WebpackChunkSizeLimitPlugin(config) {
        this.config = __assign({ limit: 0, include: function () { return true; } }, config);
    }
    WebpackChunkSizeLimitPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.afterEmit.tap(PLUGIN_NAME, function (compilation) {
            var _a, _b;
            if (!_this.config.limit) {
                return;
            }
            var exceededAssets = [];
            var assets = compilation.assets;
            var fileNames = Object.keys(assets);
            for (var index = 0; index < fileNames.length; index++) {
                var isAssetQualified = true;
                var assetName = fileNames[index];
                var assetSize = assets[assetName].size();
                if ((_b = (_a = _this.config).include) === null || _b === void 0 ? void 0 : _b.call(_a, assetName)) {
                    if (assetSize > _this.config.limit) {
                        isAssetQualified = false;
                        exceededAssets.push({ assetName: assetName, assetSize: assetSize });
                    }
                }
                console.log(chalk_1["default"].green((isAssetQualified ? '✅' : '❌') + " | " + assetSize + " B | " + (index + 1) + " / " + fileNames.length + " | " + assetName + "\n"));
            }
            if (exceededAssets.length > 0) {
                console.log(chalk_1["default"].red("\n Error in " + PLUGIN_NAME +
                    ("\n - exceeded bundle count: " + exceededAssets.length) +
                    ("\n - expected bundle size: " + _this.config.limit + " B") +
                    exceededAssets.map(function (asset, index) {
                        return "\n   " + (index + 1) + ". " + asset.assetName + ": " + asset.assetSize + " B";
                    })));
                process.exit(1);
            }
            else {
                console.log(chalk_1["default"].green("\n Success in " + PLUGIN_NAME +
                    ("\n - exceeded bundle count: " + exceededAssets.length) +
                    ("\n - expected bundle size: " + _this.config.limit + " B")));
            }
        });
    };
    return WebpackChunkSizeLimitPlugin;
}());
module.exports = WebpackChunkSizeLimitPlugin;
