import chalk from 'chalk';
import { Compiler } from 'webpack';

const PLUGIN_NAME = 'WebpackAssetsSizeLimitPlugin';

// ------ ------ ------ ------ ------ ------ ------ ------

export type TWebpackChunkSizeLimitPluginConfig = {
    include: string[];
    maxAssetSize: number;
};

// ------ ------ ------ ------ ------ ------ ------ ------

class WebpackChunkSizeLimitPlugin {

    config!: TWebpackChunkSizeLimitPluginConfig;

    constructor(config: TWebpackChunkSizeLimitPluginConfig) {
        this.config = config;
    }

    apply(compiler: Compiler) {
        const { include, maxAssetSize } = this.config;
        compiler.hooks.afterEmit.tap(PLUGIN_NAME, (compilation) => {
            if (!include || !maxAssetSize) {
                return;
            }
            let exceededAssets = [];
            let assets = compilation.assets;
            let fileNames = Object.keys(assets);
            for (let index = 0; index < fileNames.length; index++) {
                let assetName = fileNames[index];
                let assetSize = assets[assetName].size();
                if (include.some(subfix => assetName.endsWith(subfix))) {
                    if (assetSize > maxAssetSize) {
                        exceededAssets.push({ assetName, assetSize });
                    }
                }
            }
            if (exceededAssets.length > 0) {
                console.log(
                    chalk.red(
                        `\n Error in ${PLUGIN_NAME}` +
                        `\n - exceeded bundle count: ${exceededAssets.length}` +
                        `\n - expected bundle size: ${maxAssetSize} B` +
                        exceededAssets.map((asset, index) => {
                            return `\n   ${index + 1}. ${asset.assetName}: ${asset.assetSize} B`;
                        })
                    )
                )
                process.exit(1);
            } else {
                console.log(
                    chalk.green(
                        `\n Success in ${PLUGIN_NAME}` +
                        `\n - exceeded bundle count: ${exceededAssets.length}` +
                        `\n - expected bundle size: ${maxAssetSize} B`
                    )
                )
            }
        });
    }
}

module.exports = WebpackChunkSizeLimitPlugin;
