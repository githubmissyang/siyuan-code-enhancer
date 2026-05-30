import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const __dirname = path.resolve();

export default {
    mode: "production",
    target: "node",
    entry: path.join(__dirname, "src", "index.ts"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js",
        library: {
            type: "commonjs2",
        },
    },
    resolve: {
        extensions: [".ts", ".js", ".scss", ".css"],
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { url: false },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    externals: {
        siyuan: "commonjs siyuan",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css",
        }),
    ],
};