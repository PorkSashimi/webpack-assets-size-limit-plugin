import chalk from 'chalk';
import { Compiler } from 'webpack';

const PLUGIN_NAME = 'WebpackAssetsSizeLimitPlugin';

// ------ ------ ------ ------ ------ ------ ------ ------

export type TWebpackChunkSizeLimitPluginConfig = {
    limit?: number;
    include?: (assetName?: string) => boolean;
};

// ------ ------ ------ ------ ------ ------ ------ ------

class WebpackChunkSizeLimitPlugin {

    config!: TWebpackChunkSizeLimitPluginConfig;

    constructor(config: TWebpackChunkSizeLimitPluginConfig) {
        this.config = { limit: 0, include: () => true, ...config };
    }

    apply(compiler: Compiler) {
        compiler.hooks.afterEmit.tap(PLUGIN_NAME, (compilation) => {
            if (!this.config.limit) {
                return;
            }
            let exceededAssets = [];
            let assets = compilation.assets;
            let fileNames = Object.keys(assets);
            for (let index = 0; index < fileNames.length; index++) {
                let isAssetQualified = true;
                let assetName = fileNames[index];
                let assetSize = assets[assetName].size();
                if (this.config.include?.(assetName)) {
                    if (assetSize > this.config.limit) {
                        isAssetQualified = false;
                        exceededAssets.push({ assetName, assetSize });
                    }
                }
                console.log(
                    chalk.green(
                        `${isAssetQualified ? '✅' : '❌'} | ${assetSize} B | ${index + 1} / ${fileNames.length} | ${assetName}\n`
                    )
                );
            }
            if (exceededAssets.length > 0) {
                console.log(
                    chalk.red(
                        `\n Error in ${PLUGIN_NAME}` +
                        `\n - exceeded bundle count: ${exceededAssets.length}` +
                        `\n - expected bundle size: ${this.config.limit} B` +
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
                        `\n - expected bundle size: ${this.config.limit} B`
                    )
                )
            }
        });
    }
}

module.exports = WebpackChunkSizeLimitPlugin;
