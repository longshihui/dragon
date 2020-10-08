/**
 * Electron主进程生产环境打包配置
 */
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from '../webpack.config.base';
import ProjectConfig from '../../../project.config';

export default merge.smart(baseConfig, {
    devtool: 'source-map',
    mode: 'development',
    target: 'electron-main',
    entry: ProjectConfig.entry.main,
    output: {
        path: ProjectConfig.output.path,
        filename: ProjectConfig.output.mainFilename,
        libraryTarget: 'commonjs2'
    },

    plugins: [
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
            NODE_ENV: 'development',
            DEBUG_PROD: false,
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
