import path from "path";
import TerserPlugin from "terser-webpack-plugin";

const __dirname = path.resolve();

export default {
    mode: "production",
    target: "node",
    experiments: {
        outputModule: true,
    },
    entry: path.join(__dirname, "src", "kernel.ts"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "kernel.js",
        library: {
            type: "module",
        },
    },
    resolve: {
        extensions: [".ts", ".js"],
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    externals: {
        siyuan: "commonjs siyuan",
    },
};