/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export default {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(
                                process.cwd(),
                                './',
                                'tsconfig.json'
                            ),
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(process.cwd(), 'src')
        }
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
