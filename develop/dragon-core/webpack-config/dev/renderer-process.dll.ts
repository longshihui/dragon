/* eslint global-require: off, const/no-dynamic-require: off */

/**
 * Builds the DLL for development electron renderer process
 */

import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from '../webpack.config.base';
import { dependencies } from '../../../package.json';

interface Options {
    outputPath: string;
}

export default function (options: Options) {
    return merge.smart(baseConfig, {
        entry: {
            renderer: Object.keys(dependencies || {})
        },

        output: {
            library: 'renderer',
            path: options.outputPath,
            filename: '[name].dev.dll.js',
            libraryTarget: 'var'
        },

        devtool: 'eval',

        mode: 'development',

        target: 'electron-renderer',

        externals: ['fsevents', 'crypto-browserify'],
        stats: 'none',
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
                    test: /\.global\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /^((?!\.global).)*\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1
                            }
                        }
                    ]
                },
                // SASS support - compile all .global.scss files and pipe it to style.css
                {
                    test: /\.global\.(scss|sass)$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                // SASS support - compile all other .scss files and pipe it to style.css
                {
                    test: /^((?!\.global).)*\.(scss|sass)$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                constLoaders: 1,
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'sass-loader'
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
            new webpack.DllPlugin({
                path: path.join(options.outputPath, '[name].json'),
                name: '[name]'
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
                NODE_ENV: 'development'
            })
        ]
    });
}
