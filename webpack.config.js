const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {plugins} = require("@babel/preset-env/lib/plugins-compat-data");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

function optimization() {
    const config = {
        // Разбиение подключённых библиотек на файлы
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ];
    }

    return config;
}

function fileName(ext) {
    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
}

function cssLoaders(extra) {
    const loaders = [
        {
            loader:  MiniCssExtractPlugin.loader,
        },
            'css-loader'
        ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
}

function babelOptions(preset) {
    const options = {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }

    if (preset) {
        options.options.presets.push(preset)
    }

    return options;
}

function getPlugins() {
    const base = [
        // Генерация HTML фала
        new HtmlWebpackPlugin({
            // Путь до файла шаблона
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        // Очистка папки dist
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src/assets/favicon.ico'),
        //             to: path.resolve(__dirname, 'dist/assets'),
        //         },
        //     ],
        // }),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
        }),
    ];

    return base;
}

module.exports = {
    mode: mode,
    devtool: isDev ? 'source-map' : false,
    // Начальная точка входа для всех файлов
    context: path.resolve(__dirname, 'src'),
    // Входной файл или массив файлов
    entry: {
        main: './main.js',
        // assetModuleFilename: path.resolve(__dirname, 'dist/assets/images/name_[hash]_[ext]')
    },
    // Выходной файл
    output: {
        // Путь
        path: path.resolve(__dirname, 'dist'),
        // название
        // [name] - паттерн: название подтягивается из entry
        filename: fileName('js'),
    },
    //
    resolve: {
        // Расширение по умолчанию
        // extensions: ['.js', '.json', '.png', '.scss', '.css'],
        // Сокращение для путей
        alias: {
            '@scripts': path.resolve(__dirname, 'src/scripts'),
            '@lib': path.resolve(__dirname, 'src/scripts/modules'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@fonts': path.resolve(__dirname, 'src/fonts'),
            '@img': path.resolve(__dirname, 'src/assets/images'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@': path.resolve(__dirname, 'src'),
        },
    },
    // Плагины для работы
    plugins: getPlugins(),
    // Модуль лоадеров
    module: {
        // Правила поведения
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: true,
                }
            },
            {
                // Тип файла
                test: /\.css$/,
                // Используй для него это
                use: cssLoaders(),
            },
            {
                // Тип файла
                test: /\.s[ac]ss$/,
                // Используй для него это
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif|webp)$/,
                include: path.resolve(__dirname, "src/assets/images"),
                type: 'asset/resource',
                generator: {
                    filename: "assets/[name]_[hash][ext]",
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: "fonts/[name]_[hash][ext]",
                },
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: babelOptions(),
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: babelOptions('@babel/preset-typescript'),
            },
        ]
    },
    // Оптимизация
    optimization: optimization(),
    // target: isDev ? "web" : "browserslist",
    devServer: {
        open: true,
        hot: isDev,
        port: 'auto',
        static: {
            directory: './src',
            watch: true,
        },
    },
};