/**
 * Electron主进程生产环境打包配置
 */
import webpack from 'webpack';
import merge from 'webpack-merge';
// 代码压缩
import TerserPlugin from 'terser-webpack-plugin';
// 打包解析
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from '../webpack.config.base';
import CheckNodeEnv from '../../src/utils/CheckNodeEnv';
import ProjectConfig from '../../../project.config';

CheckNodeEnv('production');

export default merge.smart(baseConfig, {
    devtool: process.env.DEBUG_PROD ? 'source-map' : false,

    mode: 'production',

    target: 'electron-main',

    entry: ProjectConfig.entry.main,

    output: {
        filename: ProjectConfig.output.mainFilename,
        libraryTarget: 'commonjs2'
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                cache: true
            })
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:
                process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
            openAnalyzer: process.env.OPEN_ANALYZER === 'true'
        }),

        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         */
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: process.env.DEBUG_PROD,
            START_MINIMIZED: false
        })
    ],

    /**
     * Disables webpack processing of __dirname and __filename.
     * If you run the bundle in node.js it falls back to these values of node.js.
     * https://github.com/webpack/webpack/issues/2010
     */
    node: {
        __dirname: false,
        __filename: false
    }
});
