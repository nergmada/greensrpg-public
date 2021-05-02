const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const mode = env && ['production', 'development'].includes(env.MODE) ? env.MODE : 'development';   
    const dev = mode === 'development';
    return [{
        name: 'greensrpg-server',
        mode: 'development',
        target: 'node',
        entry: './server/index.js',
        output: {
            path: path.resolve(__dirname, './build'),
            filename: 'server.js'
        },
        resolve: {
            alias: {
                lib: path.resolve('server', 'lib'),
                campaigns: path.resolve('server', 'campaigns')
            },
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'module', 'main']
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
                {
                    test: /\.(png|jpe?g)$/i,
                    use: [{
                        loader: 'img-optimize-loader',
                        options: {
                            outputPath: 'app/imgs',
                            name: '[path][name].[ext]',
                            publicPath: (url, resourcePath, context) => {
                                return `imgs/${url}`;
                            },
                            compress: {
                                webp: true,
                                disableOnDevelopment: false,
                            },
                        },
                    }],
                },
            ]
        },
        plugins: [
            new CopyPlugin({patterns: [
                { 
                    from: 'campaigns/**/*', 
                    context: 'server'
                }
            ]}),
        ],
        optimization: {
            usedExports: true,
        },
    },
    {
        name: 'green-rpg-client',
        mode,
        target: 'web',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './build/app'),
            filename: 'index.js'
        },
        resolve: {
            alias: {
                //Svelte
                svelte: path.resolve('node_modules', 'svelte'),
                //Src links
                components: path.resolve('src', 'components'),
                styles: path.resolve('src', 'styles'),
                lib: path.resolve('src', 'lib'),
                data: path.resolve('src', 'data'),
                assets: path.resolve('src', 'assets')
            },
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'browser', 'module', 'main']
        },
        module: {
            rules: [
                {
                    test: /\.(html|svelte)$/,
                    //exclude: /node_modules/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            css: true,
                            hotReload: dev
                        }
                    }
                },
                {
                    // make all files ending in .json5 use the `json5-loader`
                    test: /\.json5$/,
                    use: 'json5-loader',
                    type: 'javascript/auto'
                },
                {
                    test: /\.css$/,
                    use: [
                        dev ? 'style-loader' : ExtractCssChunks.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        dev ? 'style-loader' : ExtractCssChunks.loader,
                        // Translates CSS into CommonJS
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            }
                        },
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g)$/i,
                    use: [{
                        loader: 'img-optimize-loader',
                        options: {
                            compress: {
                                webp: true,
                                disableOnDevelopment: false,
                            },
                        },
                    }],
                },
                {
                    test: /\.(wav|mp3)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.pegjs$/,
                    loader: 'pegjs-loader'
                },
            ]
        },
        plugins: [
            new ExtractCssChunks({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
            }),
            new htmlWebpackPlugin({
                title: "Green's RPGs",
                favicon: 'src/assets/favicon.ico'
            })
        ],
    }];
}