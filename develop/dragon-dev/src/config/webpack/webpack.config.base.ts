/**
 * webpack基础配置
 */
import webpack from 'webpack';
import type { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export default function webpackBaseConfigFactory(options: {
    tsconfig: string;
}): Configuration {
    return {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [/^@dragon/],
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@dragon-cli/babel-preset']
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: options.tsconfig,
                                transpileOnly: true
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                formatter: 'codeframe'
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'production'
            })
        ]
    };
}
