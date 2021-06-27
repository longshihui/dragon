import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import WebpackBaseConfigFactory from './webpack.config.base';
import StyleWebpackConfig from './styles.config';
import StaticFilesWebpackConfig from './static-files.config';
import type { Configuration } from 'webpack';

const TS_CONFIG_PATH = path.resolve(process.cwd(), 'tsconfig.render.json');

interface Options {
    entry: string;
}

export default function (options: Options) {
    return merge<Configuration>(
        WebpackBaseConfigFactory({
            tsconfig: TS_CONFIG_PATH
        }),
        StyleWebpackConfig,
        StaticFilesWebpackConfig,
        {
            devtool: 'inline-source-map',
            mode: 'development',
            target: 'electron-renderer',
            entry: ['react-hot-loader/patch', options.entry],
            output: {
                publicPath: '/'
            },
            stats: 'none',
            plugins: [
                new webpack.HotModuleReplacementPlugin({
                    multiStep: true
                }),
                new webpack.ProgressPlugin()
            ]
        }
    );
}
