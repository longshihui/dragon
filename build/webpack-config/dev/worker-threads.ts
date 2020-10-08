/**
 * 工作线程打包配置
 */
import merge from 'webpack-merge';
import baseConfig from '../webpack.config.base';
import ProjectConfig from '../../../project.config';

export default merge.smart(baseConfig, {
    devtool: false,
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    target: 'node',
    entry: {
        TimerSchedule: './src/worker-threads/TimerSchedule/worker.ts'
    },
    output: {
        path: ProjectConfig.output.path,
        filename: '[name].worker.js',
        libraryTarget: 'commonjs2'
    },

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
