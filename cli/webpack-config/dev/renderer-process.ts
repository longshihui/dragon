/* eslint global-require: off, import/no-dynamic-require: off */

/**
 * Build config for development electron renderer process that uses
 * Hot-Module-Replacement
 *
 * https://webpack.js.org/concepts/hot-module-replacement/
 */

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { spawn } from 'child_process';
import baseConfig from '../webpack.config.base';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import ProjectConfig from '../../../project.config';

interface Options {
    host: string;
    port: number;
    dllManifestPath: string;
}

export default function ({ host, port, dllManifestPath }: Options) {
    const publicPath = `http://${host}:${port}/`;

    return merge.smart(baseConfig, {
        devtool: 'inline-source-map',

        mode: 'development',

        target: 'electron-renderer',

        entry: ['react-hot-loader/patch', ProjectConfig.entry.renderer],

        output: {
            path: ProjectConfig.output.path,
            publicPath,
            filename: ProjectConfig.output.rendererFilename,
            libraryTarget: 'commonjs2'
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: 'style-loader' // creates style nodes from JS strings
                        },
                        {
                            loader: 'css-loader' // translates CSS into CommonJS
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                javascriptEnabled: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                // WOFF Font
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                },
                // WOFF2 Font
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                },
                // TTF Font
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream'
                        }
                    }
                },
                // EOT Font
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'file-loader'
                },
                // SVG Font
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml'
                        }
                    }
                },
                // Common Image Formats
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                    use: 'url-loader'
                }
            ]
        },

        plugins: [
            new webpack.DllReferencePlugin({
                context: path.join(__dirname, '..', 'dll'),
                manifest: dllManifestPath,
                sourceType: 'var'
            }),
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            }),

            /**
             * Create global important which can be configured at compile time.
             *
             * Useful for allowing different behaviour between development builds and
             * release builds
             *
             * NODE_ENV should be production so that modules do not perform certain
             * development checks
             *
             * By default, use 'development' as NODE_ENV. This can be override with
             * 'staging', for example, by changing the ENV variables in the npm scripts
             */
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development'
            }),
            new webpack.ProgressPlugin()
            // new FriendlyErrorsWebpackPlugin({
            //     compilationSuccessInfo: {
            //         messages: [`Render进程运行在 ${publicPath}`],
            //         notes: ['编译成功']
            //     },
            //     clearConsole: true
            // })
        ],
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        },
        node: {
            __dirname: false,
            __filename: false
        },

        devServer: {
            host,
            port,
            publicPath,
            compress: true,
            noInfo: true,
            stats: 'errors-only',
            inline: true,
            lazy: false,
            hot: true,
            overlay: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
            contentBase: [
                path.join(__dirname, '..', 'dist'),
                path.join(__dirname, '..', 'dll')
            ],
            index: 'App.tsx.html',
            quiet: true,
            watchOptions: {
                aggregateTimeout: 300,
                ignored: /node_modules/,
                poll: 100
            },
            historyApiFallback: {
                verbose: true,
                disableDotRule: true
            },
            before() {
                if (process.env.START_HOT) {
                    console.log('Starting Main Process...');
                    spawn('npm', ['run', 'start-main-dev'], {
                        shell: true,
                        env: process.env,
                        stdio: 'inherit'
                    })
                        .on('close', code => process.exit(code))
                        .on('error', spawnError => console.error(spawnError));
                }
            }
        }
    });
}
